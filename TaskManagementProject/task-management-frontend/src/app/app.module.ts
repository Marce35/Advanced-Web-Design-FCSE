import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from "@angular/material/button";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule} from "@angular/material/icon";
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectModalComponent } from './components/modals/project-modal/project-modal.component';
import { MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav} from "@angular/material/sidenav";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatCardModule} from '@angular/material/card';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskModalComponent } from './components/modals/task-modal/task-modal.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {ChartPageComponent} from "./components/projects-chart/projects-chart.component";
import { TasksChartComponent } from './components/tasks-chart/tasks-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProjectListComponent,
    ProjectModalComponent,
    LoginComponent,
    RegisterComponent,
    TaskListComponent,
    TaskModalComponent,
    ChartPageComponent,
    TasksChartComponent
  ],
  imports: [
    // BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // FormsModule,
    // DragDropModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatSidenav,
    // MatIcon,
    // MatDivider,
    // MatNavList,
    // MatListItem,
    // MatCard,
    // MatCardHeader,
    // MatCardContent,
    // MatCardActions,
    // MatFormField,
    // MatSelect,
    // MatOption,
    // MatLabel,
    // MatCardTitle
    BrowserModule,
    BrowserAnimationsModule,  // Make sure this is added for Angular Material
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDivider,
    MatNavList,
    MatListItem,
    MatSidenav,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatCardModule,
    MatDialogContent,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    BaseChartDirective
  ],
  providers: [
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
