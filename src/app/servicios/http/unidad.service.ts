import { HttpClient } from '@angular/common/http';
import {UnidadResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadHttpService {

  constructor(private http: HttpClient) { }
  guardar(unidad) {
    return this.http.post(`${HOST}/unidades`, unidad);
  }
  actualizar(unidad) {
    return this.http.put(`${HOST}/unidades`, unidad);
  }
  eliminar(id: number) {
    return this.http.delete(`${HOST}/unidades/${id}`);
  }
  filtrar(event?) {
    return this.http.get<UnidadResponse>(`${HOST}/unidades`, {
      params: event
    });
  }
}
