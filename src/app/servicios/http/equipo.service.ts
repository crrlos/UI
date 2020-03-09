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
    equipo.marcaId = equipo.marca.id;
    equipo.tipoId = equipo.tipo.id;
    equipo.tecnologiaId = equipo.tecnologia.id;
    equipo.gasId = equipo.gas.id;
    equipo.voltaje = equipo.voltaje.name;

    return this.http.put(`${HOST}/equipos`, equipo);
  }
  agregar(equipo: any) {
    equipo.marcaId = equipo.marca.id;
    equipo.tipoId = equipo.tipo.id;
    equipo.tecnologiaId = equipo.tecnologia.id;
    equipo.gasId = equipo.gas.id;
    equipo.voltaje = equipo.voltaje.name;

    return this.http.post(`${HOST}/equipos`, equipo);
  }
}
