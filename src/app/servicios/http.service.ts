import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UnidadMedida, Voltaje, CotizacionResponse
} from 'src/app/interfaces/interfaces';
import { HOST } from '../config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) { }

  unidades_medida() {
    return this.http.get<UnidadMedida[]>(`${HOST}/unidadesmedida`);
  }
  voltajes() {
    return this.http.get<Voltaje[]>(`${HOST}/voltajes`);
  }
  cotizacion_agregar(data: any) {
    return this.http.post(`${HOST}/cotizaciones`, { clienteId: data.cliente.id, descripcion: data.descripcion });
  }
  cotizacion_actualizar(data: any) {
    return this.http.put(`${HOST}/cotizaciones/${data.cotizacion_id}`, {
      cotizacion_id: data.cotizacion_id, id_cliente: data.cliente.cliente_id, descripcion: data.descripcion
    });
  }
  cotizaciones(event?: any) {
    return this.http.get<CotizacionResponse>(`${HOST}/cotizaciones`, {
      params: event
    });
  }



}
