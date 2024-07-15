import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserRole } from "src/modules/users/enums/users.enum";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("You are not authenticated");
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }

    return true;
  }
}
