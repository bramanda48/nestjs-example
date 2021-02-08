import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiPropertyOptional, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SiswaService } from './siswa.service';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { RequestDto } from '@system/dto';

@ApiTags('Siswa')
@Controller('siswa')
export class SiswaController {
    constructor(private readonly siswaService: SiswaService) {}

    @Post()
    @ApiOperation({ summary: 'Menambahkan data siswa baru ke database.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success - Created' })
    create(@Body() createSiswaDto: CreateSiswaDto) {
        return this.siswaService.create(createSiswaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Menampilkan seluruh data siswa.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success - OK' })
    findAll(@Query() req: RequestDto) {
        return this.siswaService.findAll(req);
    }

    @Get('detail/:id')
    @ApiOperation({ summary: 'Menampilkan data siswa sesuai id.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success - OK' })
    findOne(@Param('id') id: string) {
        return this.siswaService.findOne(+id);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Mengubah data siswa yang telah ada.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success - OK' })
    update(@Param('id') id: string, @Body() updateSiswaDto: UpdateSiswaDto) {
        return this.siswaService.update(+id, updateSiswaDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Menghapus data siswa yang telah ada.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success - OK' })
    remove(@Param('id') id: string) {
        return this.siswaService.remove(+id);
    }
}
