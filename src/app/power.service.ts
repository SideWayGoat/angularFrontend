import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PowerModel } from './PowerModel';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  baseurl = "../assets/output"

  constructor(private http:HttpClient) { }

  getData(): Observable<PowerModel> {
    return this.http.get<PowerModel>(this.baseurl);
  }
}
