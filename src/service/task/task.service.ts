import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { ILike, Repository } from 'typeorm';
import { TaskEntity } from 'src/persistance/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatusDto } from 'src/dto/status-task.dto';
import { GetTaskFilter } from 'src/dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity, 'postgres')
    private taskRepository: Repository<TaskEntity>,
  ) {}

  getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  getTaskWithFilters(filterDto: GetTaskFilter): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    if (status) {
      return this.taskRepository.find({ where: { status } });
    }
    if (search) {
      return this.taskRepository.find({
        where: [
          { title: ILike(`%${search}%`) },
          { description: ILike(`%${search}%`) },
        ],
      });
    }
    throw new NotFoundException(`Task with those filters not found`);
  }

  getTaskById(id: string): Promise<TaskEntity> {
    const found = this.taskRepository.findOneBy({
      id,
    });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: 'OPEN',
    });
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatusDto,
  ): Promise<TaskEntity> {
    const task: TaskEntity = await this.getTaskById(id);
    this.taskRepository.merge(task, status);
    return await this.taskRepository.save(task);
  }
}
