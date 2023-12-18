import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserProfileDto } from "./user.dto";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put("profile/:id")
  async updateProfile(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: UpdateUserProfileDto,
  ) {
    return this.usersService.updateProfile(id, body);
  }
}
