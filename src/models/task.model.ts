import { StatusTypes } from '../dto/status-task.dto';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusTypes;
}
