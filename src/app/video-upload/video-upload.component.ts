import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ApexPlotOptions, ApexStroke, NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import localforage from 'localforage';

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
  fill: ApexFill | any;
  legend: ApexLegend | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: any;
  grid: any;
  colors: any;
  tooltip: any;
};

declare var MediaRecorder: any;

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, MatTabsModule, NgApexchartsModule],
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.css'
})
export class VideoUploadComponent {

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions>;

  url!: string | ArrayBuffer | any;
  format: any;
  file!: File | any;
  pathUrl: any;
  describe: any;
  visibleArea: any;

  videoMimeTypes: string[] = [
    'video/webm',
    'video/mpeg',
    'video/mp4',
    'video/ogg',
    'video/quicktime',
  ];
  recordableMimeType: any = '';
  stream: MediaStream | any;
  streamVideoUrl: string = '';
  recorder: MediaRecorder | any;
  recordedChunks: Blob[] = [];
  fileSize: number = 0;
  recordedVideoFile: File | any;
  recordedVideoUrl: string = '';
  isEnd: boolean = false;
  hasStarted: boolean = false;
  recordedVideoBase64: any = '';
  fileName: any;
  selectedTab: any;
  dashboard: boolean = false;
  selectedImg: any;
  isPlaying: boolean = false;
  recentVideoUrl: any
  selectedCategory: any
  private videoUrlFile = 'assets/recentVideoUrl.json';

  @ViewChild('preview') previewVideo: ElementRef | any;
  @ViewChild('play') playVideo: ElementRef | any;
  @ViewChild('fileInput') fileInput: ElementRef | any;

  constructor(public router: Router, public api: ServiceService, private http: HttpClient) {
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.pathUrl = this.router.url.split('/')[2];
        console.log(this.pathUrl);
      }
    });

    this.chartOptions = {
      series: [44, 56],
      labels: [`You scored`, 'Need to improve'],
      legend: {
        show: false,
        showForSingleSeries: false
      },
      chart: {
        width: '100%',
        type: "donut"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      colors: ['#00e396', '#008ffb'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }
      ]
    };

  }

  async ngOnInit() {
    await localforage.config({
      name: 'Pro Communication', // Customize the storage name
    });

    this.selectedTab = 1
    this.hasStarted = false;
    this.isPlaying = false

    const videoStatus = localStorage.getItem('video');
    videoStatus == 'uploaded' ? (this.dashboard = true, this.format = 'video', this.selectedCategory = 1) : this.dashboard = false
    this.recentVideoUrl = await localforage.getItem('RecentvideoUrl');
    console.log(this.recentVideoUrl);
  }

  menuClicked(data: any) {
    this.format = 'video'
    this.selectedCategory = 1
    this.dashboard = true
  }

  selectCategory(id: any) {
    this.selectedCategory = id
    console.log(this.selectedCategory);

  }

  // Upload Video--------------------------------------------------------------------------------

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.file = file; // Store the file
      const reader = new FileReader();
      reader.readAsDataURL(file);

      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result as string;
          this.compressImage(this.url, 0.7);
        };
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
          console.log(this.url);
        };
      }
    }
  }

  compressImage(dataUrl: any, quality: number) {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      this.url = compressedDataUrl;
      console.log(this.url);
    };
  }

  onUpload(data: any) {
    const urlToupload: any = data == 'video' ? this.recordedVideoBase64 : this.url
    const fileToupload = data == 'video' ? this.recordedVideoFile : this.file
    const URL = urlToupload != undefined && urlToupload != ''
    const FILE = fileToupload != undefined && fileToupload != ''
    console.log(fileToupload);

    if (URL && FILE) {
      const Data = {
        "userId": 1,
        "baseUrl": urlToupload,
        "name": fileToupload.name,
        "lastModifiedDate": fileToupload.lastModifiedDate,
        "size": fileToupload.size,
        "type": fileToupload.type,
        "videoCategory": 'null'
      }
      console.log(Data);

      this.api.imageUpload(Data).subscribe({
        next: async (res) => {
          console.log(res);
          alert('Successful')
          this.dashboard = true;
          this.selectedCategory = 1
          this.format = 'video'
          this.recordedVideoBase64 = ''
          this.url = ''
          localStorage.setItem('video', 'uploaded');
          await localforage.setItem('RecentvideoUrl', urlToupload);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      alert('No files found to upload !')
    }
  }

  onDelete() {
    this.url = null;
    this.file = null
    this.fileInput.nativeElement.value = '';
  }

  // Record Video--------------------------------------------------------------------------------

  onStartRecording = async (): Promise<void> => {
    this.recordedChunks = [];

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.previewVideo.nativeElement.srcObject = this.stream;
      this.previewVideo.nativeElement.play();

      this.recordableMimeType = this.videoMimeTypes.find((mimeType: any) =>
        MediaRecorder.isTypeSupported(mimeType)
      );

      if (!this.recordableMimeType) {
        throw new Error('No supported MIME type found for MediaRecorder.');
      }

      this.recorder = new MediaRecorder(this.stream, { mimeType: this.recordableMimeType });

      this.recorder.addEventListener('dataavailable', (event: any) => {
        this.handleOnDataAvailable(event);
      });

      this.recorder.start(100);
      this.hasStarted = true;
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  handleOnDataAvailable = (event: any): void => {
    if (event.data?.size > 0) {
      this.recordedChunks.push(event.data);
      const blob = new Blob(this.recordedChunks, {
        type: this.recordableMimeType,
      });
      this.recordedVideoFile = new File(
        [blob],
        this.getNowDateTimestampString(),
        { type: this.recordableMimeType }
      );
      console.log(this.recordedVideoFile);

      this.recordedVideoUrl = URL.createObjectURL(this.recordedVideoFile);

      this.playVideo.nativeElement.src = this.recordedVideoUrl;
      this.convertBlobToBase64(blob);
    }
  };

  convertBlobToBase64 = (blob: Blob): void => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.recordedVideoBase64 = reader.result as string;
      console.log(this.recordedVideoBase64); // You can now use the Base64 string as needed
      // this.playVideo.nativeElement.src = this.recordedVideoBase64;
    };
    reader.readAsDataURL(blob);
  };

  TrashRecordedVideo() {
    this.isEnd = false
    this.hasStarted = false;
    this.playVideo.nativeElement.src = ''
    this.recordedVideoUrl = ''
    this.recordedVideoFile = ''
  }

  onStopRecording = (): void => {
    console.log('stoped');
    this.recorder.stop();
    this.stream.getTracks().forEach((track: any) => track.stop());
    this.isEnd = true;
    this.hasStarted = false;
  };

  private getNowDateTimestampString = (): string => {
    const nowDate = new Date();
    return (
      nowDate.getFullYear().toString() +
      (nowDate.getMonth() + 1).toString().padStart(2, '0') +
      nowDate.getDate().toString().padStart(2, '0') +
      '_' +
      nowDate.getHours().toString().padStart(2, '0') +
      nowDate.getMinutes().toString().padStart(2, '0') +
      nowDate.getSeconds().toString().padStart(2, '0') +
      '_' +
      nowDate.getMilliseconds().toString().padStart(3, '0')
    );
  };

  navigate(data: any) {
    this.selectedTab = 2
    this.router.navigate(['/Video/' + data]);
    this.dashboard = false
  }

  tab(id: any) {
    this.selectedTab = id;
  }

  Describe(txt: any, id: any) {
    this.describe = id;
  }

  visiblearea(data: any, id: any) {
    this.visibleArea = id;
  }

  SelectedImg(id: any) {
    this.selectedImg = id;
  }

  play() {
    var video: any = document.getElementById('recordedVideo');
    video.play();
    this.isPlaying = true;
  }

  pause() {
    var video: any = document.getElementById('recordedVideo');
    video.pause();
    this.isPlaying = false;
  }

  DeleteVideo() {
    this.api.deletevideo(1).subscribe({
      next: (res => {
        console.log(res);
      }), error: (err => {
        console.log(err);
      })
    })
  }

  ngOnDestroy() {
    this.playVideo.nativeElement.src = ''
  }
}
