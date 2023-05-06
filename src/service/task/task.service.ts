import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/models/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskStatusDto } from 'src/dto/status-task.dto';
import { GetTaskFilter } from 'src/dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  private task: Task[] = [];

  getAllTasks(): Task[] {
    return this.task;
  }

  getTaskWithFilters(filterDto: GetTaskFilter): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((tasks) => {
        if (
          tasks.title.includes(search) ||
          tasks.description.includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.task.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
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
    const found = this.getTaskById(id);
    this.task = this.task.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, { status }: TaskStatusDto) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
