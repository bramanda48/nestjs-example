import { Injectable } from '@nestjs/common';
import { ResponseDto } from '@system/dto';
import { AppConfigService, AppDatabaseService } from '@system/service';
import { CreateKelaDto } from './dto/create-kelas.dto';
import { UpdateKelaDto } from './dto/update-kelas.dto';
import { Kelas } from './entities/kelas.entity';

@Injectable()
export class KelasService {
    constructor(
        private readonly config: AppConfigService,
        private readonly db: AppDatabaseService,
    ) {}
    
    create(createKelaDto: CreateKelaDto): Promise<ResponseDto> {
        return this.db.insert(Kelas, {
            nama: createKelaDto.nama
        });
    }

    findAll(): Promise<ResponseDto> {
        return this.db.show(Kelas, {
            page: 'x',
        });
    }

    findOne(id: number): Promise<ResponseDto> {
        return this.db.show(Kelas, {
            where: 'id = :id',
            limit: '1',
            page : 'x',
        }, {id: id});
    }

    update(id: number, updateKelaDto: UpdateKelaDto): Promise<ResponseDto> {
        const param = {
            id: id
        };
        return this.db.update(Kelas, {
            nama: updateKelaDto.nama
        }, 'id = :id', param);
    }

    remove(id: number): Promise<ResponseDto> {
        const param = {
            id: id
        };
        return this.db.delete(Kelas, 'id = :id', param);
    }
}
