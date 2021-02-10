import { Body, Controller, HttpStatus, Ip, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginApp } from '@system/dto';
import { AppAuthService } from './app-auth.service';

@ApiTags('App')
@Controller('app')
export class AppAuthController {
    constructor(private readonly auth: AppAuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login ke dalam aplikasi.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success - OK' })
    login(@Body() login: LoginApp, @Ip() ip) {
        return this.auth.login(login, ip);
    }
}
