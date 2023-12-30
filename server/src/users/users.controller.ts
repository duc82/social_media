import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserProfileDto } from "./users.dto";
import { Role } from "./entity/user.entity";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  async getUserProfile(
    @Req() req: Request & { user: { userId: string; role: Role } },
  ) {
    return this.usersService.getUserProfile(req.user.userId);
  }

  @Post("profile/update")
  async updateUserProfile(
    @Req() req: Request & { user: { userId: string; role: Role } },
    @Body() body: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfile(req.user.userId, body);
  }
}
