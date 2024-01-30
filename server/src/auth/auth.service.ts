import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./auth.dto";
import { Role } from "src/users/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "src/users/entity/profile.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { AvatarInitialsService } from "src/avatar-initials/avatar-initials.service";

@Injectable()
export class AuthService {
  private readonly accessTokenExpired: number;
  private readonly refreshTokenExpired: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private avatarInitialsService: AvatarInitialsService,
    private cloudinaryService: CloudinaryService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    const accessTokenExpired = process.env.ACCESS_TOKEN_EXPIRED;
    const refreshTokenExpired = process.env.REFRESH_TOKEN_EXPIRED;

    if (!accessTokenExpired || !refreshTokenExpired) {
      throw new Error(
        "ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED must be defined",
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

  async signUp(signUpDto: SignUpDto) {
    const userExists = await this.usersService.findByEmail(signUpDto.email);

    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    const buffer = this.avatarInitialsService.generateAvatarInitials(
      signUpDto.fullName,
    );

    const cloudinaryResponse =
      await this.cloudinaryService.uploadFileFromBuffer(buffer);

    const profile = this.profileRepository.create({
      avatar: cloudinaryResponse.secure_url,
    });

    const newUser = await this.usersService.create({
      ...signUpDto,
      profile,
    });

    return {
      user: newUser,
      message: "User created successfully",
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email, {
      relations: ["profile"],
    });

    if (!user) {
      throw new BadRequestException("Email or password is incorrect");
    }

    const isPasswordMatching = await user.comparePassword(signInDto.password);

    if (!isPasswordMatching) {
      throw new BadRequestException("Email or password is incorrect");
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

    return {
      user,
      accessToken,
      refreshToken,
      message: "User logged in successfully",
    };
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken);

    if (!payload) {
      throw new BadRequestException("Invalid token");
    }

    const user = await this.usersService.findById(payload.userId);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const newPayload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = await this.generateToken(newPayload, {
      expiresIn: this.accessTokenExpired / 1000,
    });

    return {
      accessToken,
      message: "Token refreshed successfully",
    };
  }
}
