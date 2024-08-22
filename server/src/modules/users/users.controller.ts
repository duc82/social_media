import { Url } from "../../common/decorators/url.decorator";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { UpdateUserDto, UpdateUserProfileDto } from "./users.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { AdminGuard } from "src/common/guards/admin.guard";
import { SkipAuth } from "src/common/decorators/auth.decorator";
import { User } from "src/common/decorators/user.decorator";

@UseGuards(AuthGuard)
@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @SkipAuth()
  @Get()
  async getAll(@Query() query: QueryDto) {
    return this.usersService.getAll(query);
  }

  @Get("search")
  async search(
    @User("userId") currentUserId: string,
    @Query() query: QueryDto,
  ) {
    return this.usersService.search(currentUserId, query);
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
  async getCurrent(@User("userId") currentUserId: string) {
    return this.usersService.getCurrent(currentUserId);
  }

  @Put("profile/update")
  async updateUserProfile(
    @User("userId") userId: string,
    @Body() userProfileDto: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfile(userId, userProfileDto);
  }

  @UseGuards(AdminGuard)
  @Put("update/:id")
  async update(@Param("id") id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @Put("remove/:id")
  async remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
