import { Injectable } from '@nestjs/common';
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
    
    create(createKelaDto: CreateKelaDto) {
        return this.db.insert(Kelas, {
            nama: createKelaDto.nama
        });
    }

    findAll() {
        return this.db.show(Kelas, {
            page: 'x',
        });
    }

    findOne(id: number) {
        return this.db.show(Kelas, {
            where: 'id = :id',
            page : 'x',
            limit: '1',
        }, {id: id});
    }

    update(id: number, updateKelaDto: UpdateKelaDto) {
        const param = {
            id: id
        };
        return this.db.update(Kelas, {
            nama: updateKelaDto.nama
        }, 'id = :id', param);
    }

    remove(id: number) {
        const param = {
            id: id
        };
        return this.db.delete(Kelas, 'id = :id', param);
    }
}
