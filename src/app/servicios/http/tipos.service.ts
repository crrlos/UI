import { HttpClient } from '@angular/common/http';
import { TipoResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiposHttpService {

  constructor(private http: HttpClient) { }
  guardar(tipo: any) {
    return this.http.post(`${HOST}/tipos`, tipo);
  }
  actualizar(tipo: any) {
    return this.http.put(`${HOST}/tipos`, tipo);
  }
  eliminar(id: number) {
    return this.http.delete(`${HOST}/tipos/${id}`);
  }
  filtrar(event?: any) {
    return this.http.get<TipoResponse>(`${HOST}/tipos`, {
      params: event
    });
  }
}
