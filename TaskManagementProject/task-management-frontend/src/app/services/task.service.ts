import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateTaskRequest, Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';
  private projectId!: number;
  private projectName!: string;

  constructor(private http: HttpClient) {}

  setProjectName(projectName: string): void{
    this.projectName = projectName;
  }
  getProjectName(): string {
    return this.projectName;
  }
  // Set the current projectId
  setProjectId(projectId: number): void {
    this.projectId = projectId;
  }

  // Get the current projectId
  getProjectId(): number {
    return this.projectId;
  }

  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`);
  }

  createTask(task: CreateTaskRequest, projectId: number): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/project/${projectId}`, task);
  }

  updateTask(taskId: number, task: CreateTaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}/edit`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}/delete`);
  }
}
