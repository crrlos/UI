import { HttpClient } from '@angular/common/http';
import { Cliente, ClienteResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteHttpService {

  constructor(private http: HttpClient) { }
  clientes(filtro) {
    return this.http.get<Cliente[]>(`${HOST}/clientes?filtro=${filtro}`);
  }
  filtrar(event?) {
    return this.http.get<ClienteResponse>(`${HOST}/clientes`, {
      params: event
    });
  }
  guardar(cliente: Cliente) {
    return this.http.post(`${HOST}/clientes`, cliente);
  }
  actualizar(cliente: Cliente) {
    return this.http.put(`${HOST}/clientes`, cliente);
  }
  eliminar(cliente :Cliente){
    return this.http.delete(`${HOST}/clientes/${cliente.id}`)
  }
}
