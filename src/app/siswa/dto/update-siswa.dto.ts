import { PartialType } from '@nestjs/mapped-types';
import { CreateSiswaDto } from './create-siswa.dto';

export class UpdateSiswaDto extends PartialType(CreateSiswaDto) {}