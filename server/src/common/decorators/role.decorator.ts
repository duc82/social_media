import { SetMetadata } from "@nestjs/common";
import { MemberRole } from "src/enums/role.enum";

export const ROLES_KEY = "roles";

export const MemberRoles = (...roles: MemberRole[]) =>
  SetMetadata(ROLES_KEY, roles);
