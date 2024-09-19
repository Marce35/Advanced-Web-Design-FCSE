import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute} from "@angular/router";
import { Task } from '../../models/task';
import {MatDialog} from "@angular/material/dialog";
import {TaskModalComponent} from "../modals/task-modal/task-modal.component";
import {TasksChartComponent} from "../tasks-chart/tasks-chart.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  projectId!: number;
  projectName!: string;

  @ViewChild(TasksChartComponent) tasksChartComponent!: TasksChartComponent;

  constructor(private taskService: TaskService, private dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('projectId')){
      this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    }
    this.projectId = this.taskService.getProjectId() ?? Number(this.route.snapshot.paramMap.get('projectId'));
    this.projectName = this.taskService.getProjectName();// Get projectId from the service
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasksByProject(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;

      if (this.tasksChartComponent) {
        this.tasksChartComponent.loadTaskData();  // Call the method in the TasksChartComponent to reload the data
      }
    });
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: { projectId: this.projectId }  // No task data when adding a new task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();  // Reload tasks after adding
      }
    });
  }

  openEditTaskModal(task: Task): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: { task }  // Pass the existing task data for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();  // Reload tasks after editing
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();  // Refresh the task list
    });
  }
}
