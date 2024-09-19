import {Component, Inject} from '@angular/core';
import {CreateTaskRequest, TaskState} from "../../../models/task";
import {TaskService} from "../../../services/task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  isEditMode = false;
  task: CreateTaskRequest = { name: '', description: '', dueDate: '', taskState: TaskState.TODO, projectId: undefined };
  taskStates = Object.values(TaskState);  // Get enum values as an array
  taskId: number | undefined;  // Store taskId if in edit mode

  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any  // Inject data for edit mode
  ) {
    if (data && data.task) {
      // Editing an existing task
      this.isEditMode = true;
      this.task = { ...data.task };
      this.taskId = data.task.id;  // Store taskId for updating
    } else {
      // Creating a new task, get the projectId from TaskService
      this.task.projectId = data.projectId;
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.isEditMode) {
      // Update task with taskId
      this.taskService.updateTask(this.taskId!, this.task).subscribe(() => {
        this.dialogRef.close(true);  // Close modal after updating
      });
    } else {
      // Create task with projectId
      this.taskService.createTask(this.task, this.task.projectId!).subscribe(() => {
        this.dialogRef.close(true);  // Close modal after creating
      });
    }
  }
}
