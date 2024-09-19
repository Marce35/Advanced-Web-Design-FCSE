import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {ChartPageComponent} from "./components/projects-chart/projects-chart.component";

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:projectId/tasks', component: TaskListComponent },
  { path: 'projects-chart', component: ChartPageComponent }
  // { path: 'charts', component: TaskListComponent } // Placeholder for chart page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
