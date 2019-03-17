import { HttpClient } from '@angular/common/http';
import {MarcaResponse, GasResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GasHttpService {

  constructor(private http: HttpClient) { }
  guardar(tecnologia) {
    return this.http.post(`${HOST}/gases`, tecnologia);
  }
  actualizar(tecnologia) {
    return this.http.put(`${HOST}/gases`, tecnologia);
  }
  eliminar(id: number) {
    return this.http.delete(`${HOST}/gases/${id}`);
  }
  filtrar(event?) {
    return this.http.get<GasResponse>(`${HOST}/gases`, {
      params: event
    });
  }
}
