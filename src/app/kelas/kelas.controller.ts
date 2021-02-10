import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppGuard } from '@system/auth';
import { KelasService } from './kelas.service';
import { CreateKelaDto } from './dto/create-kelas.dto';
import { UpdateKelaDto } from './dto/update-kelas.dto';

@ApiTags('Kelas')
@Controller('kelas')
export class KelasController {
    constructor(private readonly kelasService: KelasService) {}

    @Post()
    @ApiOperation({ summary: 'Menambahkan data kelas baru ke database.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiBearerAuth('Authorization')
    @UseGuards(AppGuard)
    create(@Body() createKelaDto: CreateKelaDto) {
        return this.kelasService.create(createKelaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Menampilkan seluruh data kelas.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    findAll() {
        return this.kelasService.findAll();
    }

    @Get('detail/:id')
    @ApiOperation({ summary: 'Menampilkan data siswa sesuai id.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    findOne(@Param('id') id: string) {
        return this.kelasService.findOne(+id);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Mengubah data siswa yang telah ada.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiBearerAuth('Authorization')
    @UseGuards(AppGuard)
    update(@Param('id') id: string, @Body() updateKelaDto: UpdateKelaDto) {
        return this.kelasService.update(+id, updateKelaDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Menghapus data siswa yang telah ada.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiBearerAuth('Authorization')
    @UseGuards(AppGuard)
    remove(@Param('id') id: string) {
        return this.kelasService.remove(+id);
    }
}
