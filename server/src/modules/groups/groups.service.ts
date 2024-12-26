import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CreateGroupDto } from "./groups.dto";
import { Group } from "./entities/groups.entity";
import { MemberRole } from "src/enums/role.enum";
import { QueryDto } from "src/shared/dto/query.dto";
import { GroupMember } from "./entities/group_members.entity";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class GroupsService {
  private readonly groupRepository = this.dataSource.getRepository(Group);
  private readonly groupMemberRepository =
    this.dataSource.getRepository(GroupMember);

  constructor(
    private readonly dataSource: DataSource,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getAll(userId: string, query: QueryDto) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const [groups, total] = await this.groupRepository
      .createQueryBuilder("g")
      .leftJoinAndSelect("g.members", "gm")
      .leftJoinAndSelect("gm.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .loadRelationCountAndMap("g.totalMembers", "g.members")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("gm.groupId")
          .from(GroupMember, "gm")
          .where("gm.userId = :userId", { userId })
          .getQuery();
        return `g.id IN ${subQuery}`;
      })
      .andWhere(search ? "c.name ILIKE :search" : "TRUE", {
        search: `%${search}%`,
      })
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return { groups, total, page, limit };
  }

  async getById(id: string, userId: string) {
    const group = await this.groupRepository
      .createQueryBuilder("g")
      .leftJoinAndSelect("g.members", "gm")
      .leftJoinAndSelect("gm.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .loadRelationCountAndMap("g.totalMembers", "g.members")
      .where("g.id = :id", { id })
      .andWhere("gm.userId = :userId", { userId })
      .getOne();

    if (!group) {
      throw new BadRequestException("Group not found");
    }

    return group;
  }

  async create(
    body: CreateGroupDto,
    userId: string,
    pictureFile: Express.Multer.File,
    wallpaperFile: Express.Multer.File,
  ) {
    const isExists = await this.groupRepository.existsBy({
      name: body.name,
    });

    if (isExists) {
      throw new BadRequestException("Group already exists");
    }

    const members = body.members.map((id) => ({
      user: { id },
      role: MemberRole.MEMBER,
    }));

    members.unshift({ user: { id: userId }, role: MemberRole.ADMIN });

    const picture = await this.firebaseService.uploadFile(
      pictureFile,
      `groups/${pictureFile.originalname}`,
    );

    const wallpaper = await this.firebaseService.uploadFile(
      wallpaperFile,
      `groups/${wallpaperFile.originalname}`,
    );

    const newGroup = this.groupRepository.create({
      ...body,
      picture,
      wallpaper,
      members,
    });

    await newGroup.save();

    return {
      message: "Group created successfully",
      group: newGroup,
    };
  }
}
