import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule, AppDatabaseModule } from '@system/module';
import { AppConfigService } from '@system/service';
import { AppAuthService } from './app-auth.service';
import { AppAuthController } from './app-auth.controller';
import { AppAuthStrategy } from './strategy/app-auth.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: async (config: AppConfigService) => ({
                secret: config.jwt_secret,
                signOptions: {expiresIn: config.jwt_expires_in},
            })
        }),
        AppConfigModule,
        AppDatabaseModule,
    ],
    controllers: [AppAuthController],
    providers: [AppAuthService, AppAuthStrategy]
})
export class AppAuthModule {}
