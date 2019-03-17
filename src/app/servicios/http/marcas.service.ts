import { HttpClient } from '@angular/common/http';
import {MarcaResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcaHttpService {

  constructor(private http: HttpClient) { }
  guardar(tecnologia) {
    return this.http.post(`${HOST}/marcas`, tecnologia);
  }
  actualizar(tecnologia) {
    return this.http.put(`${HOST}/marcas`, tecnologia);
  }
  eliminar(id: number) {
    return this.http.delete(`${HOST}/marcas/${id}`);
  }
  filtrar(event?) {
    return this.http.get<MarcaResponse>(`${HOST}/marcas`, {
      params: event
    });
  }
}
