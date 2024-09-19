import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateProjectRequest, Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  getProjectsForUser(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/user/${userId}`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${projectId}`);
  }

  createProject(project: CreateProjectRequest, userId: number): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/create/${userId}`, project);
  }

  updateProject(projectId: number, project: CreateProjectRequest): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${projectId}/edit`, project);
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/delete`);
  }
}
