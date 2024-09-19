import { Task } from "./task";

export enum Category{
  PROGRAMMING = 0,
  WORKOUT = 1,
  BASIC = 2
}
export interface Project {
  id: number;
  name: string;
  description: string;
  category: Category;
  userId: number;
  tasks: Task[];
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  category: Category;
}

