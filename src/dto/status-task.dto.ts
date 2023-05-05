import { IsIn, IsString } from 'class-validator';

const statusTypes = ['OPEN', 'DONE', 'IN_PROGRESS'] as const;
export type StatusTypes = (typeof statusTypes)[number];

export class TaskStatusDto {
  @IsString()
  @IsIn(statusTypes)
  status: StatusTypes;
}
