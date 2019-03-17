import { HttpClient } from '@angular/common/http';
import { TecnologiaResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaHttpService {

  constructor(private http: HttpClient) { }
  guardar(tecnologia) {
    return this.http.post(`${HOST}/tecnologias`, tecnologia);
  }
  actualizar(tecnologia) {
    return this.http.put(`${HOST}/tecnologias`, tecnologia);
  }
  eliminar(id: number) {
    return this.http.delete(`${HOST}/tecnologias/${id}`);
  }
  filtrar(event?) {
    return this.http.get<TecnologiaResponse>(`${HOST}/tecnologias`, {
      params: event
    });
  }
}
