import { Url } from "../../common/decorators/url.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { ProfileDto, UpdateUserDto } from "./users.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { AdminGuard } from "src/common/guards/admin.guard";
import { SkipAuth } from "src/common/decorators/auth.decorator";
import { User } from "src/common/decorators/user.decorator";

@UseGuards(AuthGuard)
@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  // @UseGuards(AdminGuard)
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

  @Get(":id/profile")
  async getProfile(@Param("id") userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Get("current")
  async getCurrent(@User("userId") currentUserId: string) {
    return this.usersService.getProfile(currentUserId);
  }

  @Post("profile/update")
  async updateCurrentProfile(
    @User("userId") userId: string,
    @Url() url: string,
    @Body() profile: ProfileDto,
  ) {
    return this.usersService.updateProfile(userId, profile, url);
  }

  @UseGuards(AdminGuard)
  @Put("update/:id")
  async update(@Param("id") id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string) {
    return this.usersService.deleteOne(id);
  }
}
