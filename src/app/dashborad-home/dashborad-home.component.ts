import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexXAxis,
  NgApexchartsModule
} from "ng-apexcharts";
import localforage from 'localforage';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  grid: ApexGrid | any;
  colors: string[] | any;
  legend: ApexLegend | any;
  tooltip: any
};

@Component({
  selector: 'app-dashborad-home',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './dashborad-home.component.html',
  styleUrl: './dashborad-home.component.css'
})

export class DashboradHomeComponent {

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(public router: Router, public api: ServiceService) {

    localStorage.removeItem('video')
    this.deleteForagebyKey('RecentvideoUrl')
    // this.deleteForagebyKey('MyVideoScores')
    localStorage.removeItem('MyVideoScores');
  }

  userId: any
  overAllScore: any
  TopFiveVideoScores: any
  TopFiveRanks: any


  async ngOnInit() {
    localStorage.removeItem('video')
    await this.deleteForagebyKey('RecentvideoUrl')
    // this.deleteForagebyKey('MyVideoScores')
    localStorage.removeItem('MyVideoScores');

    this.userId = localStorage.getItem('PC-UID');
    this.getAllscore()
  }

  deleteForagebyKey(data: any): Promise<any> {
    return localforage.removeItem(data).then(function () {
      console.log('Data has been removed 1');
    }).catch(function (err) {
      console.error('Error removing data: 1', err);
    });
  }

  getAllscore() {
    this.api.getAllScore(this.userId).subscribe({
      next: (res => {
        console.log(res);
        this.overAllScore = res;
        const keysToExclude = ["id", "userId", "videoId", "voiceGraphBase64"];
        let allKeysProcessed = true;
        for (const key in this.overAllScore) {
          if (this.overAllScore.hasOwnProperty(key) && !keysToExclude.includes(key)) {
            let value = this.overAllScore[key];
            if (typeof value === 'number' || !isNaN(Number(value))) {
              this.overAllScore[key] = Math.round(Number(value));
            } else {
              allKeysProcessed = false;
              break;
            }
          }
        }
        if (allKeysProcessed) {
          this.TopFiveRank();
        }
      }), error: (err => {
        console.log(err);
      })
    })
  }

  TopFiveRank() {
    this.api.getTopFiveRank().subscribe({
      next: (res => {
        console.log(res);
        this.TopFiveRanks = res;



        this.chartOptions = {
          series: [
            {
              name: "Scored",
              data: [Math.round(this.TopFiveRanks[0]?.overAllScroe), Math.round(this.TopFiveRanks[1]?.overAllScroe), Math.round(this.TopFiveRanks[2]?.overAllScroe), Math.round(this.TopFiveRanks[3]?.overAllScroe), Math.round(this.TopFiveRanks[4]?.overAllScroe)]
            }
          ],
          chart: {
            height: 350,
            type: "bar",
            events: {
              click: function (chart: any, w: any, e: any) {
                // console.log(chart, w, e)
              }
            }
          },
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#D10CE8"
          ],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          grid: {
            show: false
          },
          xaxis: {
            categories: [
              ["John"],
              ["Gunal"],
              ["Sahal"],
              ["David"],
              ["Deepa"]
            ],
            labels: {
              style: {
                colors: [
                  "#008FFB",
                  "#00E396",
                  "#FEB019",
                  "#FF4560",
                  "#D10CE8"
                ],
                fontSize: "12px"
              }
            }
          },
          tooltip: {
            enabled: true,
            theme: "dark",
            y: {
              formatter: function (val: number) {
                return val.toString() + "%";
              }
            }
          }
        };


        this.TopFiveVideoScore()
      }), error: (err => {
        console.log(err);
      })
    })
  }

  TopFiveVideoScore() {
    this.api.getTopFiveVideoScore(this.userId).subscribe({
      next: (res => {
        console.log(res);
        this.TopFiveVideoScores = res;

        console.log(this.TopFiveVideoScores[0]?.overAllScore);

      }), error: (err => {
        console.log(err);
      })
    })
  }

  navigate(data: any) {
    this.router.navigate(['/Video/' + data])
  }

}
