import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SiswaService } from './siswa.service';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { RequestDto } from '@system/dto';
import { AppGuard } from '@system/auth';

@ApiTags('Siswa')
@Controller('siswa')
export class SiswaController {
    constructor(private readonly siswaService: SiswaService) {}

    @Post()
    @ApiOperation({ summary: 'Menambahkan data siswa baru ke database.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiBearerAuth('Authorization')
    @UseGuards(AppGuard)
    create(@Body() createSiswaDto: CreateSiswaDto) {
        return this.siswaService.create(createSiswaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Menampilkan seluruh data siswa.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    findAll(@Query() req: RequestDto) {
        return this.siswaService.findAll(req);
    }

    @Get('detail/:id')
    @ApiOperation({ summary: 'Menampilkan data siswa sesuai id.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    findOne(@Param('id') id: string) {
        return this.siswaService.findOne(+id);
    }

    @Put('update/:id')
    @ApiOperation({ summary: 'Mengubah data siswa yang telah ada.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiBearerAuth('Authorization')
    @UseGuards(AppGuard)
    update(@Param('id') id: string, @Body() updateSiswaDto: UpdateSiswaDto) {
        return this.siswaService.update(+id, updateSiswaDto);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Menghapus data siswa yang telah ada.' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiBearerAuth('Authorization')
    @UseGuards(AppGuard)
    remove(@Param('id') id: string) {
        return this.siswaService.remove(+id);
    }
}
