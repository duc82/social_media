import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./auth.dto";
import { Role } from "src/users/entity/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private readonly accessTokenExpired: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    const accessTokenExpired = process.env.ACCESS_TOKEN_EXPIRED;

    if (!accessTokenExpired) {
      throw new Error("Please provide ACCESS_TOKEN_EXPIRED in .env");
    }

    this.accessTokenExpired = +accessTokenExpired;
  }

  async generateToken(
    payload: { userId: string; role: Role },
    options?: JwtSignOptions,
  ) {
    return this.jwtService.signAsync(payload, options);
  }

  async signUp(signUpDto: SignUpDto) {
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
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }

    const isPasswordMatching = await user.comparePassword(signInDto.password);

    if (!isPasswordMatching) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = await this.generateToken(payload, {
      expiresIn: this.accessTokenExpired / 1000,
    });

    return {
      user,
      accessToken,
      message: "User logged in successfully",
    };
  }
}
