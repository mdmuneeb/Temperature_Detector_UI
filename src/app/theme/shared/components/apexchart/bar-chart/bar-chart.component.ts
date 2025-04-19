// angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

// project import

// third party
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexFill,
  ApexTooltip,
  ApexLegend,
  ApexGrid,
  ApexMarkers
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
  grid?: ApexGrid;
  markers?: ApexMarkers;
};

@Component({
  selector: 'app-bar-chart',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit{

  public columnChartOptions!: Partial<ChartOptions>;
  public lineChartOptions!: Partial<ChartOptions>;

  private iteration = 11;
  private trigoStrength = 3;

  ngOnInit(): void {
    const baseval = new Date('12/12/2016 00:20:00').getTime();

    this.columnChartOptions = {
      chart: {
        height: 350,
        type: 'bar',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: { speed: 1000 }
        },
        toolbar: { show: false },
        zoom: { enabled: false },
        events: {
          animationEnd: (chartCtx: any) => {
            const newData = chartCtx.w.config.series[0].data.slice();
            newData.shift();
            setTimeout(() => {
              chartCtx.updateOptions({
                series: [{ data: newData }],
                subtitle: {
                  text: `${this.getRangeRandom({ min: 1, max: 20 })}%`
                }
              });
            }, 300);
          }
        }
      },
      series: [{
        name: 'Load Average',
        data: this.generateMinuteWiseTimeSeries(baseval, 12)
      }],
      xaxis: {
        type: 'datetime',
        range: 2700000
      },
      stroke: { width: 0 },
      dataLabels: { enabled: false },
      title: {
        text: 'Load Average',
        align: 'left',
        style: { fontSize: '12px' }
      },
      subtitle: {
        text: '20%',
        floating: true,
        align: 'right',
        offsetY: 0,
        style: { fontSize: '22px' }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.5,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100]
        }
      },
      legend: { show: true }
    };

    this.lineChartOptions = {
      chart: {
        height: 350,
        type: 'line',
        stacked: true,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: { speed: 1000 }
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        },
        toolbar: { show: false },
        zoom: { enabled: false },
        events: {
          animationEnd: (chartCtx: any) => {
            const newData1 = chartCtx.w.config.series[0].data.slice();
            newData1.shift();
            const newData2 = chartCtx.w.config.series[1].data.slice();
            newData2.shift();
            setTimeout(() => {
              chartCtx.updateOptions({
                series: [
                  { data: newData1 },
                  { data: newData2 }
                ],
                subtitle: {
                  text: Math.floor(this.getRandom() * Math.random()).toString()
                }
              });
            }, 300);
          }
        }
      },
      series: [
        {
          name: 'Running',
          data: this.generateMinuteWiseTimeSeries(baseval, 12)
        },
        {
          name: 'Waiting',
          data: this.generateMinuteWiseTimeSeries(baseval, 12)
        }
      ],
      xaxis: {
        type: 'datetime',
        range: 2700000
      },
      stroke: {
        curve: 'straight',
        width: 5
      },
      dataLabels: { enabled: false },
      title: {
        text: 'Processes',
        align: 'left',
        style: { fontSize: '12px' }
      },
      subtitle: {
        text: '20',
        floating: true,
        align: 'right',
        offsetY: 0,
        style: { fontSize: '22px' }
      },
      legend: {
        show: true,
        floating: true,
        horizontalAlign: 'left',
        onItemClick: { toggleDataSeries: false },
        position: 'top',
        offsetY: -33,
        offsetX: 60
      },
      grid: {
        padding: { left: 0, right: 0 }
      },
      markers: {
        size: 0
      }
    };

    setInterval(() => this.updateLiveData(), 3000);
  }

  private generateMinuteWiseTimeSeries(baseval: number, count: number): [number, number][] {
    const series = [];
    for (let i = 0; i < count; i++) {
      const y =
        (Math.sin(i / this.trigoStrength) * (i / this.trigoStrength) +
          i / this.trigoStrength +
          1) *
        (this.trigoStrength * 2);
        series.push({ x: baseval, y });
      baseval += 300000;
    }
    return series;
  }

  private getRandom(): number {
    return (
      (Math.sin(this.iteration / this.trigoStrength) * (this.iteration / this.trigoStrength) +
        this.iteration / this.trigoStrength +
        1) *
      (this.trigoStrength * 2)
    );
  }

  private getRangeRandom(yrange: { min: number; max: number }): number {
    return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  }

  private updateLiveData() {
    this.iteration++;
    const nextX = this.lineChartOptions?.series?.[0]?.data?.at(-1)?.[0] + 300000;

    (this.columnChartOptions?.series?.[0].data as any[]).push({ x: nextX, y: this.getRandom() });
    (this.lineChartOptions?.series?.[0].data as any[]).push({ x: nextX, y: this.getRandom() });
    (this.lineChartOptions?.series?.[1].data as any[]).push({ x: nextX, y: this.getRandom() });
    
  }


  }
