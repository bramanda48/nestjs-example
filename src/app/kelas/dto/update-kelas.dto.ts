import { PartialType } from '@nestjs/mapped-types';
import { CreateKelaDto } from './create-kelas.dto';

export class UpdateKelaDto extends PartialType(CreateKelaDto) {}
