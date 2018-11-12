import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area, EquiposResponse, TipoUnidad, Marca, MaterialResponse, UnidadMedida,
  MaterialEquipoArea, Gas, Tecnologia, Voltaje } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  HOST = 'http://localhost:8000';

  constructor(private http: HttpClient) { }
  areas() {
    return this.http.get<Area[]>(`${this.HOST}/areas`);
  }
  areas_agregar(area) {
    return this.http.post(`${this.HOST}/areas`, area);
  }
  areas_actualizar(area) {
    return this.http.put(`${this.HOST}/areas`, area);
  }
  areas_eliminar(area: Area) {
    return this.http.delete(`${this.HOST}/areas`, { params: { area_id: area.area_id } });
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
  materiales_agregar(material) {
    return this.http.post(`${this.HOST}/materiales`, material);
  }
  equipos_area_agregar(equipo_area) {
    return this.http.post(`${this.HOST}/equipos_area`, equipo_area);
  }
  equipos_area_actualizar(equipo_area) {
    return this.http.put(`${this.HOST}/equipos_area`, equipo_area);
  }
  material_equipo_area_agregar(material: MaterialEquipoArea) {
    return this.http.post(`${this.HOST}/materiales_equipo_area`, material);
  }
  material_equipo_area_actualizar(material: MaterialEquipoArea) {
    return this.http.put(`${this.HOST}/materiales_equipo_area`, material);
  }
  material_equipo_area_eliminar(material: MaterialEquipoArea) {
    return this.http.delete(`${this.HOST}/materiales_equipo_area`, { params: { id: material.material_equipo_area_id } });
  }
  gases_get() {
    return this.http.get<Gas[]>(`${this.HOST}/gases`);
  }
  tecnologias_get() {
    return this.http.get<Tecnologia[]>(`${this.HOST}/tecnologias`);
  }
  voltajes() {
    return this.http.get<Voltaje[]>(`${this.HOST}/voltajes`);
  }

}
