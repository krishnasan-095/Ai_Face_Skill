import { RouterModule, Routes } from '@angular/router';
import { DashboradHomeComponent } from './dashborad-home/dashborad-home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllVideosComponent } from './all-videos/all-videos.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboradHomeComponent
    },
    {
        path: 'Video/:data',
        component: VideoUploadComponent
    },
    {
        path: 'allVideos',
        component: AllVideosComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // {
    //     path: 'register',
    //     component: RegisterComponent
    // }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutes { }
