import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { CreateGroupDto } from "./groups.dto";
import { User } from "src/common/decorators/user.decorator";
import { QueryDto } from "src/shared/dto/query.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileMimeTypeValidationPipe } from "src/common/pipes/file.pipe";

@UseGuards(AuthGuard)
@Controller("api/groups")
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get()
  async getAll(@User("userId") userId: string, @Query() query: QueryDto) {
    return this.groupService.getAll(userId, query);
  }

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Body() body: CreateGroupDto,
    @User("userId") userId: string,
    @UploadedFile(FileMimeTypeValidationPipe) file: Express.Multer.File,
  ) {
    return this.groupService.create(body, userId, file);
  }
}
