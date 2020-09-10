import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresHttpService {

  PATH = 'proveedores';

  constructor(private http : HttpClient) { }


  get(){
    return this.http.get(`${HOST}/${this.PATH}`);
  }

}
