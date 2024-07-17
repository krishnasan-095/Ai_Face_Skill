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
  private baseUrl="http://192.168.29.216:5000";
  constructor(private http: HttpClient) { }

  imageUpload(data: any) {
    return this.http.post(this.baseUrl + '/post_video', data);
  }

}
