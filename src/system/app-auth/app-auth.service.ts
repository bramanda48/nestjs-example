import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AuthPayload, LoginApp, LoginAppResponse, ResponseDto } from '@system/dto'
import { AppDatabaseService } from '@system/service';
import { SysApplication } from './entities/sys-application.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppAuthService {
    constructor(
        private readonly db: AppDatabaseService,
        private readonly jwt: JwtService,
    ){}

    async login(login: LoginApp, ip: string): Promise<ResponseDto> {
        const result: ResponseDto = new ResponseDto();
        const query = await this.db.show(SysApplication, {
            field: 'id',
            where: 'app_key = :key AND app_secret = :secret',
            limit: '1',
            page : 'x',
        }, {key: login.app_key, secret: login.app_secret});

        if(!query.success) {
            throw new BadRequestException('Invalid app_key or app_secret.');
        }

        const value = query.data[0];
        const token = new LoginAppResponse();
        token.accessToken = this.createToken({
            sub: value['id'],
            ip: ip,
        });
        result.data = token;

        return result;
    }

    async validateToken(payload: AuthPayload): Promise<ResponseDto> {
        const query = await this.db.show(SysApplication, {
            where: 'id = :id',
            limit: '1',
            page : 'x',
        }, {id: payload.sub});
        return query;
    }

    createToken(payload: AuthPayload): string {
        //Generate Token
        const options: JwtSignOptions = {
            jwtid: uuid(),
        };
        const signedPayload = this.jwt.sign(payload, options);
        return signedPayload;
    }
}
