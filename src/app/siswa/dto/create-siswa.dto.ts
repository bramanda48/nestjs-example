import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateSiswaDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID Kelas', example: '1' })
    id_kelas: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Nama Siswa', example: 'Bramanda' })
    nama: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Tanggal Lahir. Format: 1998-02-27', example: '1998-02-27' })
    tgl_lahir: Date;
}
