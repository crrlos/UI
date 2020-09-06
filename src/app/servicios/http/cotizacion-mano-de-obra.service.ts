import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class CotizacionManoDeObraHttpService {
  path = 'cotizacionmanodeobra';

  constructor(private http: HttpClient) { }

  get(idCotizacion : number){
    return this.http.get(`${HOST}/${this.path}/${idCotizacion}`);
  }
  update(manodeobra : any){
    return this.http.put(`${HOST}/${this.path}`,manodeobra);
  }
  add(manodeobra : any){
    return this.http.post(`${HOST}/${this.path}`,manodeobra);
  }
  delete(id : number){
    return this.http.delete(`${HOST}/${this.path}/${id}`);
  }
}
