import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from 'src/models/task.model';
import { TaskService } from 'src/service/task/task.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';

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
}
