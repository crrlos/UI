import { Component, OnInit } from '@angular/core';
import { Area, Equipo, EquipoArea, Material, MaterialEquipoArea } from '../../../interfaces/interfaces';
import { isNumber } from 'util';
import { HttpService } from '../../../servicios/http.service';
import { equipos, materiales } from 'src/app/datos';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {

  areas: Area[] = [];
  totalGeneral = 0;
  equipos_lista: Equipo[];
  materiales_lista: Material[];

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
  agregarMaterial(material: Material) {
    this.areas.forEach(area => {
      area.equipos.forEach(equipoArea => {
        if (equipoArea.insertar_material) {
          const material_equipo: MaterialEquipoArea = {
            id_material: material.id,
            id_equipo_area: equipoArea.id,
            cantidad: 1,
            precio: material.precio,
            porcentaje_ganancia: 1,
            material: material
          };
          equipoArea.materiales.push(material_equipo);
          return;
        }
      });
    });

  }
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.equipos_lista = equipos;
    this.materiales_lista = materiales;
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

