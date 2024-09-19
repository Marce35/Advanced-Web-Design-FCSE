import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskState} from "../../models/task";
import {ChartOptions, ChartType} from "chart.js";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-tasks-chart',
  templateUrl: './tasks-chart.component.html',
  styleUrl: './tasks-chart.component.css'
})
export class TasksChartComponent implements OnInit {
  @Input({ required: true }) projectId!: number;  // Receive projectId from parent component

  // Pie chart variables
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [['TODO'], ['ONGOING'], ['COMPLETED']];
  public pieChartDatasets = [
    {
      data: [0, 0, 0],  // Placeholder, will be updated with actual counts
    }
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Bar chart variables
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };
  public barChartLabels = ['TODO', 'ONGOING', 'COMPLETED'];
  public barChartDatasets = [
    {
      label: 'Number of Tasks',
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
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTaskData();
  }

  loadTaskData(): void {
    if (this.projectId) {
      this.taskService.getTasksByProject(this.projectId).subscribe((tasks: Task[]) => {
        const taskStateCounts = { TODO: 0, ONGOING: 0, COMPLETED: 0 };

        // Count tasks per state
        tasks.forEach((task) => {
          if(task.taskState.toString() === "TODO"){
            taskStateCounts.TODO++;
          }else if(task.taskState.toString() === "ONGOING"){
            taskStateCounts.ONGOING++;
          }else{
            taskStateCounts.COMPLETED++;
          }
        });

        // Update pie chart data
        this.pieChartDatasets = [
          {
            data: [
              taskStateCounts.TODO,
              taskStateCounts.ONGOING,
              taskStateCounts.COMPLETED,
            ],
          }
        ];

        // Update bar chart data
        this.barChartDatasets = [
          {
            label: 'Number of Tasks',
            data: [
              taskStateCounts.TODO,
              taskStateCounts.ONGOING,
              taskStateCounts.COMPLETED,
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
}
