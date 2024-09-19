import {Component, Inject} from '@angular/core';
import {Category, CreateProjectRequest} from "../../../models/project";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
  isEditMode = false;
  project: CreateProjectRequest = { name: '', description: '', category: Category.PROGRAMMING };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProjectModalComponent>,
    private projectService: ProjectService
  ) {
    if (data.project) {
      // If editing, populate the form with existing project data
      this.isEditMode = true;
      this.project = { ...data.project };
    } else {
      // Default category when creating a new project
      this.project.category = Category.BASIC; // Preselect Programming as default
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isEditMode) {
      this.projectService.updateProject(this.data.project.id, this.project).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.projectService.createProject(this.project, this.data.userId).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  protected readonly Category = Category;
}
