import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

declare var MediaRecorder: any;

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.css'
})
export class VideoUploadComponent {

  url!: string | ArrayBuffer | null;
  format!: string;
  file!: File;
  pathUrl: any;


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
  recordedVideoBase64: string = '';
  fileName: any
  @ViewChild('preview') previewVideo: ElementRef | any;
  @ViewChild('play') playVideo: ElementRef | any;
  @ViewChild('fileInput') fileInput: ElementRef | any;

  constructor(public router: Router, public api: ServiceService) {
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.pathUrl = this.router.url.split('/')[2];
        console.log(this.pathUrl);
      }
    });
  }

  ngOnInit() {
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
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        console.log(this.url);
      }
    }
  }

  onUpload(data: any) {
    // if (this.file) {
    let post = {
      "videoBase64": data == 'file' ? this.url : this.recordedVideoUrl,
      "file": this.file
    }
    console.log(post);

    // this.api.imageUpload(post).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // });
    // }
  }

  onDelete() {
    this.url = null;
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
    this.playVideo.nativeElement.src = ''
  }

  onStopRecording = (): void => {
    this.recorder.stop();
    this.stream.getTracks().forEach((track: any) => track.stop());
    this.isEnd = true;
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
    this.router.navigate(['/Video/' + data])
  }

  ngOnDestroy() {
    this.playVideo.nativeElement.src = ''
  }
}
