import { Module } from '@nestjs/common';
import { AppConfigModule, AppDatabaseModule } from '@system/module';
import { SiswaService } from './siswa.service';
import { SiswaController } from './siswa.controller';
@Module({
    imports: [
        AppConfigModule,
        AppDatabaseModule,
    ],
    controllers: [SiswaController],
    providers: [SiswaService]
})
export class SiswaModule {}
