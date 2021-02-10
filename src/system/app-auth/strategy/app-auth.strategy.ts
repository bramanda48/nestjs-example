import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthPayload, ResponseDto } from '@system/dto';
import { AppConfigService } from '@system/service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppAuthService } from '../app-auth.service';

@Injectable()
export class AppAuthStrategy extends PassportStrategy(Strategy, 'app') {
    constructor(
        private readonly config: AppConfigService,
        private readonly auth: AppAuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwt_secret,
        });
    }

    async validate(payload: AuthPayload) {
        const result: ResponseDto = await this.auth.validateToken(payload);
        if(!result.success) {
            throw new UnauthorizedException();
        }
        return result;
    }
}