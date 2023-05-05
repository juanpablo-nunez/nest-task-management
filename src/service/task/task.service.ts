import { Injectable } from '@nestjs/common';
import { TaskStatus } from 'src/enum/task.status.enum';
import { Task } from 'src/models/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskStatusDto } from 'src/dto/status-task.dto';

@Injectable()
export class TaskService {
  private task: Task[] = [];

  getAllTask(): Task[] {
    return this.task;
  }

  getTaskById(id: string): Task {
    return this.task.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: 'OPEN',
    };
    this.task.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.task = this.task.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, { status }: TaskStatusDto) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
