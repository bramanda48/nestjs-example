import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginApp {
    @IsNotEmpty()
    @ApiProperty({ description: 'Application Key' })
    app_key: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Application Secret' })
    app_secret: string;
}

export class LoginAppResponse {
    @ApiProperty() 
    accessToken: string;

    @ApiProperty({ default: 'bearer' }) 
    tokenType: string = 'bearer';

    @ApiProperty() 
    expiresIn: number;

    @ApiPropertyOptional() 
    refreshToken?: string;
}