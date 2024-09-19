// export interface Task {
//   id: number;
//   name: string;
//   description: string;
//   dueDate: string;  // Format: YYYY-MM-DD
//   taskState: string;
//   projectId: number;
// }
//
// export interface CreateTaskRequest {
//   name: string;
//   description: string;
//   dueDate: string;
//   taskState: string;
//   projectId: number | undefined;
// }

export enum TaskState {
  TODO = 0,
  ONGOING = 1,
  COMPLETED = 2
}

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;  // Format: YYYY-MM-DD
  taskState: TaskState;
  projectId: number;
  projectName: string;
}

export interface CreateTaskRequest {
  name: string;
  description: string;
  dueDate: string;
  taskState: TaskState;  // Will be converted to an integer when sent to the backend
  projectId: number | undefined;
}
