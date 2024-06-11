import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "src/users/interfaces/users.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException("You are not authenticated");
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(
        accessToken,
        {
          secret: this.configService.getOrThrow<string>("ACCESS_SECRET"),
        },
      );

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException("You are not authorized");
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
