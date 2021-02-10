import { AuthGuard } from "@nestjs/passport";

export class AppGuard extends AuthGuard('app') {}