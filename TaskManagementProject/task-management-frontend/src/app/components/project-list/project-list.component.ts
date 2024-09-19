import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {MatDialog} from "@angular/material/dialog";
import {ProjectModalComponent} from "../modals/project-modal/project-modal.component";
import {Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {TasksChartComponent} from "../tasks-chart/tasks-chart.component";
import {ChartPageComponent} from "../projects-chart/projects-chart.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  @ViewChild(ChartPageComponent) projectsChartComponent!: ChartPageComponent;


  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // Load all projects for the logged-in user
  loadProjects(): void {
    const userId = Number(localStorage.getItem('loggedInUserId'));
    this.projectService.getProjectsForUser(userId).subscribe(
      (projects) => {
        this.projects = projects;

        if(this.projectsChartComponent){
          this.projectsChartComponent.loadProjectData();
        }
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  // Open modal to add a new project
  openAddProjectModal(): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '400px',
      data: { userId: Number(localStorage.getItem('loggedInUserId')) }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProjects(); // Reload the project list after adding a new project
      }
    });
  }

  // Open modal to edit an existing project
  openEditProjectModal(project: Project): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '400px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProjects(); // Reload the project list after editing a project
      }
    });
  }

  // Delete a project
  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe(() => {
      this.loadProjects(); // Reload the project list after deletion
    });
  }

  navigateToProjectTasks(projectId: number, projectName: string): void {
    this.taskService.setProjectId(projectId);  // Store the projectId in the TaskService
    this.taskService.setProjectName(projectName);
    this.router.navigate([`/projects/${projectId}/tasks`]); // Navigate to the task list page
  }
}
