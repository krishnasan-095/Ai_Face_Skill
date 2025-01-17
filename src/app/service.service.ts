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

  private AibaseUrl = "http://136.185.19.60:5006";
  private baseUrl = "http://89.116.230.242:8086/api";


  constructor(private http: HttpClient) { }

  imageUpload(data: any) {
    return this.http.post(this.AibaseUrl + '/post_video', data);
  }

  postVideo(data: any) {
    return this.http.post(this.baseUrl + '/ProCommunication/postvideo', data);
  }

  deleteByVideoId(userId: any) {
    return this.http.delete(this.baseUrl + '/proCommunication/deleteByVideoId/' + userId);
  }

  deleteAllVideo(id: any) {
    return this.http.delete(this.baseUrl + '/proCommunication/deleteAllVideo/' + id);
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

  // show top 5 Rank Users
  getTopFiveRank() {
    return this.http.get(this.baseUrl + '/proCommunication/getTopRank');
  }

  getTopFiveVideoScore(userId: any) {
    return this.http.get(this.baseUrl + '/proCommunication/getTopScore/' + userId);
  }
  // overAllScroe

  login(data: any) {
    return this.http.post(this.baseUrl + '/ProCommunication/login', data);
  }

}
