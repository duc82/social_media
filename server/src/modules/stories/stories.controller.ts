import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { StoriesService } from "./stories.service";
import { User } from "src/common/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileMimeTypeValidationPipe } from "src/common/pipes/file.pipe";

@Controller("api/stories")
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @User("userId") userId: string,
    @UploadedFile(FileMimeTypeValidationPipe) file: Express.Multer.File,
  ) {
    return this.storiesService.create(file, userId);
  }

  @Get()
  async getAll(@User("userId") userId: string) {
    return this.storiesService.getAll(userId);
  }
}
