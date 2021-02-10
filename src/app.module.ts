import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppAuthModule } from '@system/auth';
import { SiswaModule } from './app/siswa/siswa.module';
import { KelasModule } from './app/kelas/kelas.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AppAuthModule,
        SiswaModule,
        KelasModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
