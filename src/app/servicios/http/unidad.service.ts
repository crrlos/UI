import { HttpClient } from '@angular/common/http';
import { UnidadResponse, UnidadMedida } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadHttpService {

  constructor(private http: HttpClient) { }
  guardar(unidad) {
    return this.http.post(`${HOST}/unidadesmedida`, unidad);
  }
  actualizar(unidad: UnidadMedida) {
    return this.http.put(`${HOST}/unidadesmedida/${unidad.unidad_medida_id}`, unidad);
  }
  eliminar(id: number) {
    return this.http.delete(`${HOST}/unidadesmedida/${id}`);
  }
  filtrar(event?) {
    return this.http.get<UnidadResponse>(`${HOST}/unidadesmedida`, {
      params: event
    });
  }
}
