import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { UpdateUserDto } from "./users.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { SkipAuth } from "src/common/decorators/auth.decorator";
import { User } from "src/common/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

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
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.update(id, user, file);
  }

  @Put("remove/:id")
  async remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
