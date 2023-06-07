declare module "express" {
  export interface Request {
    user: {
      userId: string;
      userEmail: string;
      userName: string;
      userRole: string;
      userProfileImage: string;
    };
  }
}
