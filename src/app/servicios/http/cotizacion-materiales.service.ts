import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class CotizacionMaterialesHttpService {
  path = 'cotizacionmateriales';

  constructor(private http: HttpClient) { }

  details(idCotizacion : number){
    return this.http.get(`${HOST}/${this.path}/${idCotizacion}`);
  }
  update(material : any){
    return this.http.put(`${HOST}/${this.path}`,material);
  }
  add(material : any){
    return this.http.post(`${HOST}/${this.path}`,material);
  }
  delete(id : number){
    return this.http.delete(`${HOST}/${this.path}/${id}`);
  }
}
