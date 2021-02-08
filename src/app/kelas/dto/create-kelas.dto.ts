import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateKelaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Nama Kelas', example: 'Kelas A' })
    nama: string;
}
