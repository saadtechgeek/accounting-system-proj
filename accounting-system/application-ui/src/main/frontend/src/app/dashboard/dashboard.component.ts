import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UIChart } from "primeng/primeng";
//import '../rxjs-operators';
import { interval } from 'rxjs';


const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
  '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
  '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']


@Component({
  selector: 'at-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  accounttypePerCount = [
    { id: 1, accountType: 'Current', count: 400 },
    { id: 2, accountType: 'Saving', count: 500 },
  ]
  currentPerSavingPieLabels = this.accounttypePerCount.map((proj) => proj.accountType);
  currentPerSavingPieData = this.accounttypePerCount.map((proj) => proj.count);
  currentPerSavingPieColors = this.configureDefaultColours(this.currentPerSavingPieData);

  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {

      customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      });
    }

    return customColours;
  }

  currentPerSavingChartData = {
    labels: this.currentPerSavingPieLabels,
    datasets: [
      {
        data: this.currentPerSavingPieData,
        backgroundColor: this.currentPerSavingPieColors
      }
    ]
  }
  
  chartOptions = {
    title: {
      display: true,
      text: 'Account Ratio'
    },
    legend: {
      position: 'bottom'
    },
  };
}
