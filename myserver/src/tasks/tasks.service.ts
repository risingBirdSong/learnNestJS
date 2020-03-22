import { Injectable } from '@nestjs/common';
import { TaskI } from './task.model';
import { TaskStatus } from "./task.model";
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-filter-dto-tasks';

export type optionalTask = Partial<TaskI>;


@Injectable()
export class TasksService {
  private tasks: TaskI[] = [
    {
      "title": "another title",
      "description": "another desc",
      status: TaskStatus.OPEN,
      "id": "e000082e-4099-4546-acdb-a7f9a1024d73"
    },
    {
      "title": "title aaa",
      "description": "desc aaa",
      "status": TaskStatus.OPEN,
      "id": "715f5508-b02b-4566-bdee-203818a2934b"
    },
    {
      "title": "channel",
      "description": "progressing",
      "status": TaskStatus.IN_PROGRESS,
      "id": "82565e1e-0f07-440f-b192-9d5090213c51"
    }
  ];

  getAllTasks(): TaskI[] {
    return this.tasks;
  }

  getTaskById(id: string): TaskI {
    return this.tasks.find(tsk => tsk.id === id);
  }

  getTaskWithFilters(filterdto: GetTasksFilterDto): TaskI[] {
    const { status, search } = filterdto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(task =>
        (task.title.includes(search) || task.description.includes(search))
      )
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): TaskI {
    const { title, description } = createTaskDto;
    let task: TaskI = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuidv4()
    }
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): TaskI {
    let taskToBeDeleated = this.tasks.find(task => task.id === id);
    this.tasks = this.tasks.filter(task => task.id !== id);
    return taskToBeDeleated;
  }
  patchTaskStatus(id: string, status: TaskStatus): TaskI {
    let task = this.tasks.find(task => task.id === id);
    task.status = status;
    return task;
  }
}
