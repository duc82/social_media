import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto } from "./auth.dto";
import { CreateUserDto } from "src/users/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(signUpDto.email);

    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    const newUser = await this.usersService.create(signUpDto);

    return {
      user: newUser,
      message: "User created successfully",
    };
  }

  async signIn(signInDto: SignInDto) {
    console.log(signInDto);
    const user = await this.usersService.findByEmail(signInDto.email);

    const isPasswordMatching = await user.comparePassword(signInDto.password);

    if (!user || !isPasswordMatching) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      user,
      accessToken,
      message: "User logged in successfully",
    };
  }

  async getProfile(id: string) {
    const user = await this.usersService.findById(id, {
      relations: ["posts"],
    });
    return user;
  }
}
