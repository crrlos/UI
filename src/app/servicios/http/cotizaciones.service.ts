import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/config';
import { CotizacionResponse } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesHttpService {

  constructor(private http: HttpClient) { }


  agregar(data: any) {
    return this.http.post(`${HOST}/cotizaciones`, 
    { 
      clienteId: data.cliente.id, 
      descripcion: data.descripcion 
    }
      );
  }
  actualizar(data: any) {
    return this.http.put(`${HOST}/cotizaciones/${data.id}`, {
      id: data.id, 
      clienteId: data.cliente.id, 
      descripcion: data.descripcion
    });
  }
  obtener() {
    return this.http.get<CotizacionResponse>(`${HOST}/cotizaciones`);
  }

  eliminar(id : number){
    return this.http.delete(`${HOST}/cotizaciones/${id}`);
  }



}
