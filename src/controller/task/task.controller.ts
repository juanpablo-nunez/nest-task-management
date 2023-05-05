import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/service/task/task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { TaskStatus } from 'src/enum/task.status.enum';
import { TaskStatusDto } from 'src/dto/status-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTask(): Task[] {
    return this.taskService.getAllTask();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body() body: TaskStatusDto): Task {
    return this.taskService.updateTaskStatus(id, body);
  }
}
