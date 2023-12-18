import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = this.extractTokenFromCookie(request);

    if (!accessToken) {
      throw new UnauthorizedException("You are not authorized");
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException("You are not authorized");
    }

    return true;
  }

  private extractTokenFromCookie(req: Request): string | undefined {
    const accessToken = req.cookies["accessToken"];
    return accessToken;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    console.log(request.headers);
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
