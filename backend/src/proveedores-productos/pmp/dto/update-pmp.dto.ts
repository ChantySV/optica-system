import { PartialType } from '@nestjs/mapped-types';
import { CreatePmpDto } from './create-pmp.dto';

export class UpdatePmpDto extends PartialType(CreatePmpDto) {}
