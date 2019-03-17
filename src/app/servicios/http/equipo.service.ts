import { HttpClient } from '@angular/common/http';
import { EquiposResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoHttpService {

  constructor(private http: HttpClient) { }
  equipos(event?) {
    return this.http.get<EquiposResponse>(`${HOST}/equipos`, {
      params: event
    });
  }
  actualizar(equipo) {
    equipo.id_marca = equipo.marca.marca_id;
    equipo.id_tipo = equipo.tipo.tipo_id;
    equipo.id_tecnologia = equipo.tecnologia.tecnologia_id;
    equipo.id_gas = equipo.gas.gas_id;
    return this.http.put(`${HOST}/equipos`, equipo);
  }
  agregar(equipo: any) {
    equipo.id_marca = equipo.marca.marca_id;
    equipo.id_tipo = equipo.tipo.tipo_id;
    equipo.id_tecnologia = equipo.tecnologia.tecnologia_id;
    equipo.id_gas = equipo.gas.gas_id;

    return this.http.post(`${HOST}/equipos`, equipo);
  }
}
