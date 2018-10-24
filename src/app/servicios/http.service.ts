import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area, EquiposResponse, TipoUnidad, Marca } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  HOST = 'http://localhost:8000';

  constructor(private http: HttpClient) { }
  areas() {
    return this.http.get<Area[]>(`${this.HOST}/areas`);
  }
  equipos(event?) {
    return this.http.get<EquiposResponse>(`${this.HOST}/equipos`, {
      params: event
    });
  }
  equipos_actualizar(equipo) {
    return this.http.put(`${this.HOST}/equipos`, equipo);
  }
  tipos() {
    return this.http.get<TipoUnidad[]>(`${this.HOST}/tipos`);
  }
  marcas() {
    return this.http.get<Marca[]>(`${this.HOST}/marcas`);
  }
}
