import { ApiProperty } from "@nestjs/swagger";

export class RequestDto {
    @ApiProperty({ description: 'Sorting', required: false })
    sort: string;

    @ApiProperty({ description: 'Halaman', required: false })
    page: string;

    @ApiProperty({ description: 'Jumlah data yang ditampilkan', required: false })
    limit: string;
}