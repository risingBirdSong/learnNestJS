import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskI } from './task.model';

enum routeParams {
  urlParam_id = '/:id',
  id = 'id'
}

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Get(routeParams.urlParam_id)
  getSingleTask(@Param(routeParams.id) id: string): TaskI {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.createTask(createTaskDto);
  }
  @Delete(routeParams.urlParam_id)
  deleteTaskByTheId(@Param(routeParams.id) id: string): void {
    let deleted = this.taskService.deleteTask(id);
    console.log("the following task was delete", deleted);
    console.log("the array after deletion", this.taskService.getAllTasks())
  }

}
