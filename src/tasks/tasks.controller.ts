import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

enum taskParams {
  title = "title",
  description = "description"
}
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(
    @Body(taskParams.description) description: string,
    @Body(taskParams.title) title: string
  ) {
    return this.taskService.createTask(title, description);
  }

}
