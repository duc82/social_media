import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { CreateGroupDto } from "./groups.dto";
import { User } from "src/common/decorators/user.decorator";
import { QueryDto } from "src/shared/dto/query.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FilesArrayMimeTypeValidationPipe } from "src/common/pipes/file.pipe";

@UseGuards(AuthGuard)
@Controller("api/groups")
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get()
  async getAll(@User("userId") userId: string, @Query() query: QueryDto) {
    return this.groupService.getAll(userId, query);
  }

  @Get("/:id")
  async getById(@User("userId") userId: string, @Param("id") id: string) {
    return this.groupService.getById(id, userId);
  }

  @Post("create")
  @UseInterceptors(FilesInterceptor("files", 2))
  async create(
    @Body() body: CreateGroupDto,
    @User("userId") userId: string,
    @UploadedFiles(FilesArrayMimeTypeValidationPipe)
    files: Express.Multer.File[],
  ) {
    return this.groupService.create(body, userId, files[0], files[1]);
  }
}
