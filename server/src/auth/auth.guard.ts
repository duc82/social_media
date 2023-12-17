import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("You are not authorized");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException("You are not authorized");
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    console.log(request.headers);
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
