import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "src/modules/users/interfaces/users.interface";
import { SKIP_AUTH_KEY } from "../decorators/auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      SKIP_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isSkipAuth) {
      return true;
    }

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
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
