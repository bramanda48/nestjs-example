import { Module } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { KelasController } from './kelas.controller';
import { AppConfigModule, AppDatabaseModule } from '@system/module';

@Module({
    imports: [
        AppConfigModule,
        AppDatabaseModule,
    ],
    controllers: [KelasController],
    providers: [KelasService]
})
export class KelasModule {}
