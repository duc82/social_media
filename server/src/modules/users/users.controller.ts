import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { ChangePasswordDto, UpdateUserDto } from "./users.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@UseGuards(AuthGuard)
@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAll(
    @User("userId") currentUserId: string,
    @Query() query: QueryDto,
  ) {
    return this.usersService.getAll(currentUserId, query);
  }

  @Get("blocked")
  async getBlocked(@User("userId") userId: string, @Query() query: QueryDto) {
    return this.usersService.getBlocked(userId, query);
  }

  @Get("stories")
  async getStories(@User("userId") userId: string, @Query() query: QueryDto) {
    return this.usersService.getStories(userId, query);
  }

  @Get(":id")
  async getById(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.getById(id);
  }

  @Get(":username/profile")
  async getProfile(@Param("username") username: string) {
    return this.usersService.getProfile(username);
  }

  @Get("current")
  async getCurrent(@User("userId") userId: string) {
    return this.usersService.getCurrent(userId);
  }

  @Post("block")
  async block(
    @User("userId") blockedById: string,
    @Body("blockedId") blockedId: string,
  ) {
    return this.usersService.block(blockedById, blockedId);
  }

  @Delete("unblock/:blockedId")
  async unblock(
    @User("userId") blockedById: string,
    @Param("blockedId", new ParseUUIDPipe()) blockedId: string,
  ) {
    return this.usersService.unblock(blockedById, blockedId);
  }

  @Put("update/:id")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|jfif)$/)) {
          return cb(
            new BadRequestException("Only image file are allowed!"),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.update(id, user, file);
  }

  @Put("remove/:id")
  async remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }

  @Put("change-password")
  async changePassword(
    @User("userId") userId: string,
    @Body() body: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, body);
  }
}
