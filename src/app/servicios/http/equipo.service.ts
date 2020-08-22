import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EquiposResponse, Equipo } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoHttpService {

  constructor(private http: HttpClient) { 
  
  }

  eliminar(id:number){
    return this.http.delete(`${HOST}/equipos/${id}`);
  }

  equipos(event?: any) {
    return this.http.get<EquiposResponse>(`${HOST}/equipos`, {
      params: event,
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
      
    });
  }

  actualizar(equipo) {
    equipo.marcaId = equipo.marca.id;
    equipo.tipoId = equipo.tipo.id;
    equipo.tecnologiaId = equipo.tecnologia.id;
    equipo.gasId = equipo.gas.id;
    equipo.voltajeId = equipo.voltaje.id;

    return this.http.put(`${HOST}/equipos`, equipo);
  }
  agregar(equipo: Equipo) {

    let m2 : any = {};

    m2.codigo = equipo.codigo;
    m2.nombre = equipo.nombre;
    m2.voltaje = equipo.voltaje['name'];
    m2.precio = equipo.precio * 1;
    m2.capacidad = equipo.capacidad;
    m2.tipoId = equipo.tipo.id;
    m2.marcaId = equipo.marca.id;
    m2.gasId = equipo.gas.id;
    m2.tecnologiaId = equipo.tecnologia.id;
    m2.voltajeId = equipo.voltaje.id;

    return this.http.post(`${HOST}/equipos`, m2);
  }
}
