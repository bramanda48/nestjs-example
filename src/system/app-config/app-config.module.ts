import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: false,
            validationSchema: Joi.object({
                //App Configuration
                APP_NAME: Joi.string().default('NestJS'),
                APP_DEBUG: Joi.bool().default(true),
                APP_LOG_LEVEL: Joi.string().default('debug'),
                APP_URL: Joi.string().default('http://localhost:3000'),
                APP_PORT: Joi.number().default(3000),

                //JWT Configuration
                JWT_SECRET: Joi.string(),
                JWT_EXPIRES_IN: Joi.string().default('86400s'),
            }),
        }),
    ],
    exports: [AppConfigService],
    controllers: [],
    providers: [AppConfigService]
})
export class AppConfigModule {}
