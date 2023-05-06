import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/service/task/task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { TaskStatus } from 'src/enum/task.status.enum';
import { TaskStatusDto } from 'src/dto/status-task.dto';
import { GetTaskFilter } from 'src/dto/get-task-filter.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTask(@Query() filterDto: GetTaskFilter): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
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
