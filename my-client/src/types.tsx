import React from "react";

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}
export interface TaskI {
  id: string;
  title: string;
  description: string;
  status: TaskStatus
}