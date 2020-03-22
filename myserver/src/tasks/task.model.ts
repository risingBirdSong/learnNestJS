

//TODO consider moving these out in a global space so that both server and client can use same types
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