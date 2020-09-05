import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class CotizacionEquiposHttpService {
  path = 'cotizacionEquipos';

  constructor(private http: HttpClient) { }

  getDetails(idCotizacion : number){
    return this.http.get(`${HOST}/${this.path}/${idCotizacion}`);
  }
  update(equipo : any){
    return this.http.put(`${HOST}/${this.path}`,equipo);
  }
  add(equipo : any){
    return this.http.post(`${HOST}/${this.path}`,equipo);
  }
}
