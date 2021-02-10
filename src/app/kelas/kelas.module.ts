import { Module } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { KelasController } from './kelas.controller';
import { AppConfigModule, AppDatabaseModule } from '@system/module';
import { AppAuthModule } from '@system/auth';

@Module({
    imports: [
        AppConfigModule,
        AppDatabaseModule,
        AppAuthModule,
    ],
    controllers: [KelasController],
    providers: [KelasService]
})
export class KelasModule {}
