import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsChartComponent } from './projects-chart.component';

describe('ProjectsChartComponent', () => {
  let component: ProjectsChartComponent;
  let fixture: ComponentFixture<ProjectsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
