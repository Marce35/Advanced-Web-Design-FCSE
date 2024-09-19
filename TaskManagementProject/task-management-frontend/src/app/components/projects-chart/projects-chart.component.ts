import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {ProjectService} from "../../services/project.service";
import {Category, Project} from "../../models/project";

@Component({
  selector: 'app-projects-chart',
  templateUrl: './projects-chart.component.html',
  styleUrl: './projects-chart.component.css'
})
export class ChartPageComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [ ['Programming'], ['Workout'], ['Basic']];
  public pieChartDatasets = [
    {
      data: [0, 0, 0],  // Initialize with 0, will be updated with actual counts
    }
  ];
  public pieChartType: ChartType = 'pie';  // Chart type
  public pieChartLegend = true;  // Show legend
  public pieChartPlugins = [];  // Optional plugins for the chart

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public barChartLabels = [ ['Programming'], ['Workout'], ['Basic']];
  // public barChartDatasets = [
  //   {
  //     label: 'Number of Projects',
  //     data: [0, 0, 0],  // Initialize with 0, will be updated with actual counts
  //     borderWidth: 1
  //   }
  // ];

  public barChartDatasets = [
    {
      label: 'Number of Projects',
      data: [0, 0, 0],  // Placeholder, will be updated with actual counts
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',   // Color for TODO
        'rgba(54, 162, 235, 0.2)',   // Color for ONGOING
        'rgba(75, 192, 192, 0.2)'    // Color for COMPLETED
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',     // Color for TODO
        'rgba(54, 162, 235, 1)',     // Color for ONGOING
        'rgba(75, 192, 192, 1)'      // Color for COMPLETED
      ],
      borderWidth: 1
    }
  ];
  public barChartType: ChartType = 'bar';  // Chart type
  public barChartLegend = true;  // Show legend
  public barChartPlugins = [];  // Optional plugins for the chart


  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjectData();
  }

  // Fetch projects and categorize them
  loadProjectData(): void {
    const userId = Number(localStorage.getItem('loggedInUserId'));
    this.projectService.getProjectsForUser(userId).subscribe((projects: Project[]) => {
      const categoryCounts = { Programming: 0, Workout: 0, Basic: 0 };

      // Count projects per category
      projects.forEach((project) => {
        if(project.category.toString() === "PROGRAMMING"){
          categoryCounts.Programming++;
        }else if(project.category.toString() === "WORKOUT"){
          categoryCounts.Workout++;
        }else{
          categoryCounts.Basic++;
        }
      });

      // Populate pieChartDatasets with actual data
      this.pieChartDatasets = [
        {
          data: [
            categoryCounts.Programming,
            categoryCounts.Workout,
            categoryCounts.Basic,
          ],
        }
      ];
      this.barChartDatasets = [
        {
          label: 'Number of Projects',
          data: [
            categoryCounts.Programming,
            categoryCounts.Workout,
            categoryCounts.Basic,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',   // Color for TODO
            'rgba(54, 162, 235, 0.2)',   // Color for ONGOING
            'rgba(75, 192, 192, 0.2)'    // Color for COMPLETED
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',     // Color for TODO
            'rgba(54, 162, 235, 1)',     // Color for ONGOING
            'rgba(75, 192, 192, 1)'      // Color for COMPLETED
          ],
          borderWidth: 1
        }
      ];
    });
  }
}
