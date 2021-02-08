import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto {
    @ApiProperty({ description: 'Apakah success?'  })
    success: boolean = true;

    @ApiProperty({ description: 'Informasi pesan error.'  })
    message: string|string[] = 'Get data success.';

    @ApiProperty({ description: 'Http status code.'  })
    statusCode: number = 200;

    @ApiProperty({ description: 'Hasil request data.'  })
    data: any = null;

    @ApiProperty({ description: 'Informasi paging.'  })
    paging: ResponsePagingDto|object = null;
}

export class ResponsePagingDto {
    isNext: boolean = false;
    isPrev: boolean = false;
    page: number;
    count: number;
    total: number;
}