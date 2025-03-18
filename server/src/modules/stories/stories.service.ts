import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { DataSource, LessThan } from "typeorm";
import { Story } from "./stories.entity";
import { FirebaseService } from "../firebase/firebase.service";
import { FileType } from "src/enums/file.enum";

@Injectable()
export class StoriesService {
  public readonly storyRepository = this.dataSource.getRepository(Story);

  constructor(
    private dataSource: DataSource,
    private usersService: UsersService,
    private firebaseService: FirebaseService,
  ) {}

  async create(file: Express.Multer.File, userId: string) {
    const user = await this.usersService.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const url = await this.firebaseService.uploadFile(
      file,
      `stories/${file.originalname}`,
    );
    const type = file.mimetype.includes("image")
      ? FileType.IMAGE
      : FileType.VIDEO;

    const story = this.storyRepository.create({
      user,
      content: url,
      type,
    });

    await this.storyRepository.save(story);

    return {
      message: "Story created successfully",
      story,
    };
  }

  async getAll(userId: string) {
    return this.storyRepository.find({
      where: { user: { id: userId }, expiresAt: LessThan(new Date()) },
      relations: ["user"],
      order: {
        createdAt: "ASC",
      },
    });
  }
}
