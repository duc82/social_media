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
  constructor(
    private readonly firebaseService: FirebaseService,
    private dataSource: DataSource,
  ) {}

  async getAll(userId: string, query: QueryDto) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const [groups, total] = await this.dataSource
      .getRepository(Group)
      .createQueryBuilder("g")
      .leftJoinAndSelect("g.members", "gm")
      .leftJoinAndSelect("gm.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
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

  async create(
    body: CreateGroupDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    const group = await this.dataSource.getRepository(Group).findOne({
      where: {
        name: body.name,
      },
    });

    if (group) {
      throw new BadRequestException("Group already exists");
    }

    const members = body.members.map((id) => ({
      user: { id },
      role: MemberRole.MEMBER,
    }));

    members.unshift({ user: { id: userId }, role: MemberRole.ADMIN });

    const picture = await this.firebaseService.uploadFile(
      file,
      `groups/${file.originalname}`,
    );

    const newGroup = this.dataSource.getRepository(Group).create({
      ...body,
      picture,
      members,
    });

    await newGroup.save();

    return {
      message: "Group created successfully",
      group: newGroup,
    };
  }
}
