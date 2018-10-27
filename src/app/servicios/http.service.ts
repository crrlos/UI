import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area, EquiposResponse, TipoUnidad, Marca, MaterialResponse, UnidadMedida } from '../interfaces/interfaces';

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
  equipos_agregar(equipo) {
    return this.http.post(`${this.HOST}/equipos`, equipo);
  }
  tipos() {
    return this.http.get<TipoUnidad[]>(`${this.HOST}/tipos`);
  }
  marcas() {
    return this.http.get<Marca[]>(`${this.HOST}/marcas`);
  }
  unidades_medida() {
    return this.http.get<UnidadMedida[]>(`${this.HOST}/unidadmedida`);
  }
  materiales(event?) {
    return this.http.get<MaterialResponse>(`${this.HOST}/materiales`, {
      params: event
    });
  }
  materiales_actualizar(material) {
    return this.http.put(`${this.HOST}/materiales`, material);
  }
}
