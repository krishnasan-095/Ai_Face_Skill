import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  headers: any

  // private UserbaseUrl = 'http://192.168.1.3:8081/creedlogistics/employee';
  // private AdminbaseUrl = 'http://192.168.1.3:8081/creedlogistics';
  private AibaseUrl = "http://192.168.29.216:5000";
  private baseUrl = "http://192.168.29.223:8080/api";
  constructor(private http: HttpClient) { }

  imageUpload(data: any) {
    return this.http.post(this.AibaseUrl + '/post_video', data);
  }

  postVideo(data: any) {
    return this.http.post(this.baseUrl + '/ProCommunication/postvideo', data);
  }

  deletevideo(id: any) {
    return this.http.delete(this.baseUrl + '/proCommunication/deleteVideo/' + id);
  }

  getIndividualvideoDetailbyId(data: any) {
    return this.http.post(this.baseUrl + '/proCommunication/getdetails', data);
  }

  getAllvideoDetail(userId: any) {
    return this.http.get(this.baseUrl + '/proCommunication/getAllDetailsScore/' + userId);
  }

  getAllvideo(userId: any) {
    return this.http.get(this.baseUrl + '/proCommunication/getVideos/' + userId);
  }

  getAllScore(userId: any) {
    return this.http.get(this.baseUrl + '/proCommunication/getAllDetailsScore/' + userId);
  }

  getTopFiveRank(userId: any) {
    return this.http.get(this.baseUrl + '/proCommunication/getTopRank/' + userId);
  }

}
