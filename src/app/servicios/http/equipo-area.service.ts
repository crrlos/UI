import { HttpClient } from '@angular/common/http';
import { EquipoArea } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoAreaHttpService {

  constructor(private http: HttpClient) { }
  agregar(equipo_area) {
    return this.http.post(`${HOST}/equiposarea`, equipo_area);
  }
  actualizar(equipo_area: EquipoArea) {
    equipo_area = JSON.parse(JSON.stringify(equipo_area));
    equipo_area.materiales = [];
    return this.http.put(`${HOST}/equiposarea`, equipo_area);
  }
  eliminar(equipo_area: EquipoArea) {
    return this.http.delete(`${HOST}/equiposarea/${equipo_area.id}`);
  }
  duplicar(equipo) {
    return this.http.get(`${HOST}/equiposarea/${equipo.equipo_area_id}`);
  }
}
