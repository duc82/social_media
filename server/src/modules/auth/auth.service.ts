import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { UserService } from "src/modules/users/users.service";
import { SignInDto, SignUpDto } from "./auth.dto";
import { Profile } from "src/modules/users/entities/profiles.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { UserPayload } from "src/modules/users/interfaces/users.interface";
import { Token } from "src/modules/users/entities/tokens.entity";
import { User } from "src/modules/users/entities/users.entity";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { UserRole } from "../users/enums/users.enum";

@Injectable()
export class AuthService {
  // miliseconds
  private readonly jwtShortExpiration = +this.configService.getOrThrow<string>(
    "JWT_SHORT_EXPIRATION",
  );
  private readonly jwtLongExpiration = +this.configService.getOrThrow<string>(
    "JWT_LONG_EXPIRATION",
  );
  private readonly clientUrl =
    this.configService.getOrThrow<string>("CLIENT_URL");

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  async generateToken(
    payload: { userId: string; role: UserRole },
    options?: JwtSignOptions,
  ) {
    return this.jwtService.signAsync(payload, options);
  }

  async verifyToken<T>(token: string, options?: JwtVerifyOptions): Promise<T> {
    const payload = await this.jwtService.verifyAsync(token, options);
    return payload;
  }

  async signUp(signUpDto: SignUpDto) {
    const userExists = await this.usersService.findOne({
      where: { email: signUpDto.email },
    });

    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    const profile = this.dataSource.getRepository(Profile).create({
      avatar: signUpDto.avatar,
      birthday: signUpDto.birthday,
      gender: signUpDto.gender,
    });

    const user = await this.usersService.create({
      email: signUpDto.email,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      password: signUpDto.password,
      profile,
    });

    // send verify email
    const payload: UserPayload = {
      userId: user.id,
      role: user.role,
    };

    const token = await this.generateToken(payload, {
      expiresIn: "1h",
    });

    const link = `${this.clientUrl}/verify?token=${token}`;

    await this.mailService.sendMail({
      to: signUpDto.email,
      subject: "Verify your account",
      template: "verify-account",
      context: {
        username: user.username,
        link,
      },
    });

    return {
      user,
      message: "Sign up successfully, please verify your account",
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne({
      where: {
        email: signInDto.email,
      },
      relations: ["profile"],
    });

    if (!user) {
      throw new BadRequestException("Email or password is incorrect");
    }

    const isPasswordCorrect = await user.comparePassword(signInDto.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException("Email or password is incorrect");
    }

    if (user.bannedAt) {
      throw new BadRequestException("Your account has been banned");
    }

    const payload: UserPayload = {
      userId: user.id,
      role: user.role,
    };

    const emailToken = await this.generateToken(payload, {
      expiresIn: "1h",
    });

    const link = `${this.clientUrl}/verify?token=${emailToken}`;

    if (!user.emailVerified) {
      try {
        await this.mailService.sendMail({
          to: user.email,
          subject: "Verify your account",
          template: "verify-account",
          context: {
            username: user.username,
            link,
          },
        });
      } catch (error) {
        throw new InternalServerErrorException("Failed to send email");
      }

      throw new BadRequestException(
        "Verify your account, we have sent an email to your email address",
      );
    }

    const expiration = signInDto.isRemember
      ? this.jwtLongExpiration
      : this.jwtShortExpiration;

    const token = await this.generateToken(payload, {
      expiresIn: expiration / 1000, // seconds
    });

    return {
      user,
      token,
      message: "User logged in successfully",
    };
  }

  async verifyEmail(token: string) {
    try {
      const payload = await this.verifyToken<UserPayload>(token);
      const user = await this.usersService.findOne({
        where: {
          id: payload.userId,
        },
        select: ["id", "emailVerified"],
      });

      if (!user) {
        throw new BadRequestException("User not found");
      }

      user.emailVerified = new Date();
      await this.dataSource.getRepository(User).save(user);

      return {
        message: "Account verified successfully",
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Invalid token or token expired");
    }
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findOne({
      where: { email },
      relations: ["token"],
      select: ["id", "username"],
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
        username: user.username,
        link,
      },
    });

    return {
      message: "Email sent successfully",
    };
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = await this.verifyToken<UserPayload>(token);
      const user = await this.usersService.findOne({
        where: { id: payload.userId },
        relations: ["token"],
      });

      if (
        user?.token?.resetToken !== token ||
        user?.token?.resetTokenExpires <= new Date()
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
