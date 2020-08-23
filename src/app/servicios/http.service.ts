import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UnidadMedida, Voltaje, CotizacionResponse, VoltajeResponse
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
    return this.http.get<VoltajeResponse>(`${HOST}/voltajes`);
  }
  



}
