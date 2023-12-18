import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto } from "./auth.dto";
import { CreateUserDto } from "src/users/user.dto";
import { Request, Response } from "express";
import { Role } from "src/users/entity/user.entity";

@Injectable()
export class AuthService {
  private readonly accessTokenExpired: number;
  private readonly refreshTokenExpired: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    const accessTokenExpired = process.env.ACCESS_TOKEN_EXPIRED;
    const refreshTokenExpired = process.env.RERESH_TOKEN_EXPIRED;

    if (!(accessTokenExpired && refreshTokenExpired)) {
      throw new Error(
        "Please provide ACCESS_TOKEN_EXPIRED adn REFRESH_TOKEN_EXPIRED in .env",
      );
    }

    this.accessTokenExpired = +accessTokenExpired;
    this.refreshTokenExpired = +refreshTokenExpired;
  }

  async generateToken(
    payload: { userId: string; role: Role },
    options?: JwtSignOptions,
  ) {
    return this.jwtService.signAsync(payload, options);
  }

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

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);

    const isPasswordMatching = await user.comparePassword(signInDto.password);

    if (!user || !isPasswordMatching) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = await this.generateToken(payload, {
      expiresIn: this.accessTokenExpired / 1000,
    });
    const refreshToken = await this.generateToken(payload, {
      expiresIn: this.refreshTokenExpired / 1000,
    });

    res.cookie("accessToken", accessToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: this.accessTokenExpired,
    });

    res.cookie("refreshToken", refreshToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: this.refreshTokenExpired,
    });

    return {
      user,
      message: "User logged in successfully",
    };
  }

  async signOut(res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return {
      message: "Sign out successfully",
    };
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException("You are not authorized");
    }

    const payload = await this.jwtService.verifyAsync(refreshToken);

    const newAccessToken = await this.generateToken(payload, {
      expiresIn: this.accessTokenExpired / 1000,
    });

    res.cookie("accessToken", newAccessToken, {
      maxAge: this.accessTokenExpired,
    });

    return {
      message: "Refresh token successfully",
    };
  }

  async getProfile(id: string) {
    const user = await this.usersService.findById(id, {
      relations: ["posts"],
    });
    return user;
  }
}
