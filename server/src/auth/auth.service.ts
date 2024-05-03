import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UserService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./auth.dto";
import { Profile } from "src/users/entities/profile.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { Role, UserPayload } from "src/users/interfaces/user.interface";
import { Token } from "src/users/entities/token.entity";
import { User } from "src/users/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

@Injectable()
export class AuthService {
  private readonly accessTokenExpired: number;
  private readonly refreshTokenExpired: number;

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {
    this.accessTokenExpired = parseInt(
      this.configService.getOrThrow<string>("ACCESS_TOKEN_EXPIRED"),
    );
    this.refreshTokenExpired = parseInt(
      this.configService.getOrThrow<string>("REFRESH_TOKEN_EXPIRED"),
    );
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

    const profile = this.dataSource.getRepository(Profile).create({
      avatar: signUpDto.avatar,
    });

    const newUser = await this.usersService.create({
      email: signUpDto.email,
      fullName: signUpDto.fullName,
      password: signUpDto.password,
      profile,
    });

    // send verify email
    const payload: UserPayload = {
      userId: newUser.id,
      role: newUser.role,
    };

    const token = await this.generateToken(payload, {
      expiresIn: "1h",
    });

    const link = `${process.env.CLIENT_URL}/verify?token=${token}`;

    await this.mailService.sendMail({
      to: signUpDto.email,
      subject: "Verify your account",
      template: "verify-account",
      context: {
        fullName: signUpDto.fullName,
        link,
      },
    });

    return {
      user: newUser,
      message: "Sign up successfully, please verify your account",
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

    if (!signInDto.isRemember) {
      return {
        user,
        accessToken,
        message: "User logged in successfully",
      };
    }

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

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email, {
      relations: ["token"],
      select: ["id", "fullName"],
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const token = await this.generateToken(payload, {
      expiresIn: "1h",
    });

    const oneHour = 60 * 60 * 1000;

    if (user.token) {
      user.token.resetToken = token;
      user.token.resetTokenExpires = new Date(Date.now() + oneHour);
    } else {
      const newToken = this.dataSource.getRepository(Token).create({
        resetToken: token,
        resetTokenExpires: new Date(Date.now() + oneHour),
      });
      user.token = newToken;
    }

    await this.dataSource.getRepository(User).save(user);

    const link = `${process.env.CLIENT_URL}/resetPassword?token=${token}`;

    // send email with reset password link
    await this.mailService.sendMail({
      to: email,
      subject: "Reset password",
      template: "forgot-password",
      context: {
        fullName: user.fullName,
        link,
      },
    });

    return {
      message: "Email sent successfully",
    };
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findById(payload.userId, {
        relations: ["token"],
      });

      if (
        user?.token?.resetToken !== token ||
        user?.token?.resetTokenExpires < new Date()
      ) {
        throw new BadRequestException("Invalid token or token expired");
      }

      user.password = password;
      user.token.resetToken = null;
      user.token.resetTokenExpires = null;

      await this.dataSource.getRepository(User).save(user);

      return {
        message: "Password reset successfully",
      };
    } catch (error) {
      throw new BadRequestException("Invalid token or token expired");
    }
  }
}
