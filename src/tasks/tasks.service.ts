import { Injectable } from '@nestjs/common';
import { TaskI } from './task.model';
import { TaskStatus } from "./task.model";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class TasksService {
  private tasks: TaskI[] = [];

  getAllTasks(): TaskI[] {
    return this.tasks;
  }
  createTask(title: string, description: string): TaskI {
    let task: TaskI = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuidv4()
    }
    this.tasks.push(task);
    return task;
  }
}
