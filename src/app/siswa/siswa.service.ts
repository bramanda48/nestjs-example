import { Injectable } from '@nestjs/common';
import { RequestDto, ResponseDto } from '@system/dto';
import { AppConfigService, AppDatabaseService } from '@system/service';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { Siswa } from './entities/siswa.entity';
import { Kelas } from '../kelas/entities/kelas.entity';

@Injectable()
export class SiswaService {
    constructor(
        private readonly config: AppConfigService,
        private readonly db: AppDatabaseService,
    ) {}
    
    async create(createSiswaDto: CreateSiswaDto): Promise<ResponseDto> {
        return this.db.insert(Siswa, {
            id_kelas: createSiswaDto.id_kelas,
            nama: createSiswaDto.nama,
            tgl_lahir: createSiswaDto.tgl_lahir,
        });
    }

    async findAll(req: RequestDto): Promise<ResponseDto> {
        return this.db.show(Siswa, {
            field: 'a.id, a.nama, b.nama as nama_kelas, a.tgl_lahir, a.tgl_insert, a.last_update',
            sort : req.sort,
            limit: req.limit,
            page : req.page,            
            join : [
                {leftJoin: [Kelas, 'b.id = a.id_kelas']},
            ]
        });
    }

    async findOne(id: number): Promise<ResponseDto> {
        return this.db.show(Siswa, {
            field: 'a.id, a.nama, b.nama as nama_kelas, a.tgl_lahir, a.tgl_insert, a.last_update',
            where: 'a.id = :id',
            limit: '1',
            page : 'x',
            join : [
                {leftJoin: [Kelas, 'b.id = a.id_kelas']},
            ]
        }, {id: id});
    }

    async update(id: number, updateSiswaDto: UpdateSiswaDto): Promise<ResponseDto> {
        const param = {
            id: id
        };
        return this.db.update(Siswa, {
            id_kelas: updateSiswaDto.id_kelas,
            nama: updateSiswaDto.nama,
            tgl_lahir: updateSiswaDto.tgl_lahir,
        }, 'id = :id', param);
    }

    async remove(id: number): Promise<ResponseDto> {
        const param = {
            id: id
        };
        return this.db.delete(Siswa, 'id = :id', param);
    }
}
