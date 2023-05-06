import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { StatusTypes, statusTypes } from './status-task.dto';

export class GetTaskFilter {
  @IsNotEmpty()
  @IsOptional()
  @IsIn(statusTypes)
  status: StatusTypes;
  @IsNotEmpty()
  @IsOptional()
  search: string;
}
