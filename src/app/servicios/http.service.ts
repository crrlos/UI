import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Area } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  areas() {
    return this.http.get<Area[]>('http://localhost:8000/areas');
  }
}
