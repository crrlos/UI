import { HttpClient } from '@angular/common/http';
import { Area } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaHttpService {

  constructor(private http: HttpClient) { }
  areas(id) {
    return this.http.get<Area[]>(`${HOST}/areas/${id}`);
  }
  agregar(area : Area) {
    return this.http.post(`${HOST}/areas`, area);
  }
  actualizar(area) {
    area.id_cotizacion = area.cotizacion;
    return this.http.put(`${HOST}/areas`, area);
  }
  eliminar(area: Area) {
    return this.http.delete(`${HOST}/areas`, { params: { area_id: area.id.toString() } });
  }
}
