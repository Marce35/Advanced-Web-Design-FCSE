import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksChartComponent } from './tasks-chart.component';

describe('TasksChartComponent', () => {
  let component: TasksChartComponent;
  let fixture: ComponentFixture<TasksChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
