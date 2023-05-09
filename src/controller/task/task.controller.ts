import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/service/task/task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { TaskStatusDto } from 'src/dto/status-task.dto';
import { GetTaskFilter } from 'src/dto/get-task-filter.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTask(@Query() filterDto: GetTaskFilter): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return await this.taskService.getTaskWithFilters(filterDto);
    } else {
      return await this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: TaskStatusDto,
  ): Promise<Task> {
    return await this.taskService.updateTaskStatus(id, body);
  }
}
