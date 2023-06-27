import { JWTUserToken } from "ui/auth/auth.interfaces";
import { UserRoles } from "ui/users/user.interfaces";

interface UserPermission {
  allowed: boolean;
  redirectTo: string;
}

interface UserPermissionMap {
  [key: string]: (permission: string) => UserPermission;
}

export class Permission {
  readonly rootPath = "/";
  readonly dashboardPath = "/dasboard";

  private allowedList: string[];

  constructor(user: JWTUserToken) {
    this.allowedList = user?.userPermissions?.allowedPaths ?? "prato";
  }

  private getUserPermission(role: string): (path: string) => UserPermission {
    const permissionMap: UserPermissionMap = {
      [UserRoles.STREAMER]: (path: string) => ({
        allowed: this.allowedList.some((allowedPath) =>
          path.startsWith(allowedPath)
        ),
        redirectTo: this.dashboardPath,
      }),
      [UserRoles.USER]: (path: string) => ({
        allowed: this.allowedList.some((allowedPath) =>
          path.startsWith(allowedPath)
        ),
        redirectTo: this.dashboardPath,
      }),
    };

    return permissionMap[role || UserRoles.USER];
  }

  public checkPermission(role = UserRoles.USER, path: string): UserPermission {
    if (path === this.rootPath) {
      return {
        allowed: true,
        redirectTo: this.rootPath,
      };
    }

    const userPermission = this.getUserPermission(role);

    return userPermission(path);
  }
}
