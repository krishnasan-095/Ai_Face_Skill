import { RouterModule, Routes } from '@angular/router';
import { DashboradHomeComponent } from './dashborad-home/dashborad-home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';
import { VideoUploadComponent } from './video-upload/video-upload.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboradHomeComponent
    },
    {
        path: 'Video/:data',
        component: VideoUploadComponent
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutes { }
