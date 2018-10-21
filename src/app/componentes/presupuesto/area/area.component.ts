import { Component, OnInit } from '@angular/core';
import { Area, Equipo, EquipoArea } from '../../../interfaces/interfaces';
import { isNumber } from 'util';
import { HttpService } from '../../../servicios/http.service';
import { equipos } from 'src/app/datos';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {

  areas: Area[] = [];
  totalGeneral = 0;
  equipos_lista: Equipo[];

  agregarArea(area: string) {
    this.areas.push({
      id: Number.parseInt((Math.random() * 1000).toString()),
      nombre: area,
      equipos: []
    });
  }
  agregarEquipo(equipo: Equipo) {
    this.areas.forEach(area => {
      if (area.insertar_equipo) {
        const equipo_area: EquipoArea = {
          id_equipo: equipo.id,
          id_area: area.id,
          precio_equipo: equipo.precio,
          porcentaje_ganancia: 1,
          precio_materiales_equipo: 0,
          materiales: [],
          equipo: equipo,
          total: 0
        };
        area.equipos.push(equipo_area);
        area.insertar_equipo = false;
        return;
      }
    });
  }
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.equipos_lista = equipos;
    this.http.areas().subscribe(success => {
      this.areas = success;
    });
  }
  onNotificacion() {
    this.totalGeneral = 0;
    this.areas.forEach(area => {
      this.totalGeneral += isNumber(area.total) ? area.total : 0;
    });
  }


}

