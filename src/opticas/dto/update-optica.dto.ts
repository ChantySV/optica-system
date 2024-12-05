import { PartialType } from '@nestjs/mapped-types';
import { CreateOpticaDto } from './create-optica.dto';

export class UpdateOpticaDto extends PartialType(CreateOpticaDto) {}
