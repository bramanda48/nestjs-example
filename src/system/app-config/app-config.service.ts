import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get app_name(): string {
        return this.configService.get<string>('APP_NAME');
    }

    get app_url(): string {
        return this.configService.get<string>('APP_URL');
    }

    get app_port(): string {
        return this.configService.get<string>('APP_PORT');
    }

    get app_debug(): string {
        return this.configService.get<string>('APP_DEBUG');
    }

    get environment(): string {
        return this.configService.get<string>('APP_ENV');
    }    

    get log_level(): string {
        return this.configService.get<string>('APP_LOG_LEVEL');
    }
}
