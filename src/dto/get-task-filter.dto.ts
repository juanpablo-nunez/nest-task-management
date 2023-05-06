import { StatusTypes } from './status-task.dto';

export class GetTaskFilter {
  status?: StatusTypes;
  search?: string;
}
