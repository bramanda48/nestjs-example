import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDatabaseService } from './app-database.service';

@Module({
    exports: [AppDatabaseService],
    controllers: [],
    providers: [AppDatabaseService]
})
export class AppDatabaseModule {}
