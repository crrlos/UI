import { Component, OnInit, ViewChild } from '@angular/core';
import { Area, Equipo, EquipoArea, Material, MaterialEquipoArea } from '../../../interfaces/interfaces';
import { isNumber } from 'util';
import { HttpService } from '../../../servicios/http.service';
import { EquipoChildComponent } from '../equipo-child/equipo-child.component';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {
  @ViewChild(EquipoChildComponent)
  private equipoChild: EquipoChildComponent;

  areas: Area[] = [];
  totalGeneral = 0;
  equipos_lista: Equipo[];
  materiales_lista: Material[];
  area: Area = {};

  agregarArea() {
    this.http.areas_agregar(this.area).subscribe((id) => {
      this.areas.push({
        area_id: JSON.parse(JSON.stringify(id)).id,
        nombre: this.area.nombre,
        equipos: []
      });
    });

  }
  actualizarArea(area) {
    this.http.areas_actualizar(area).subscribe();
  }
  eliminarArea(area: Area) {
    this.http.areas_eliminar(area).subscribe(() => {
      this.areas.splice(this.areas.indexOf(area), 1);
    });
  }
  agregarEquipo(equipo: Equipo) {
    this.areas.forEach(area => {
      if (area.insertar_equipo) {
        const equipo_area: EquipoArea = {
          id_equipo: equipo.equipo_id,
          id_area: area.area_id,
          precio_equipo: equipo.equipo_precio,
          porcentaje_ganancia: 1,
          precio_materiales_equipo: 0,
          materiales: [],
          equipo: equipo,
          total: 0
        };
        this.http.equipos_area_agregar(equipo_area).subscribe((id) => {
          equipo_area.equipo_area_id = JSON.parse(JSON.stringify(id)).id;
          area.equipos.push(equipo_area);
          area.insertar_equipo = false;
          this.equipoChild.actualizarTotal();
          return;
        });
      }
    });

  }
  agregarMaterial(material: Material) {
    this.areas.forEach(area => {
      area.equipos.forEach(equipoArea => {
        if (equipoArea.insertar_material) {
          const material_equipo: MaterialEquipoArea = {
            id_material: material.material_id,
            id_equipo_area: equipoArea.equipo_area_id,
            cantidad: 1,
            precio: material.material_precio,
            porcentaje_ganancia: 1,
            material: material
          };
          this.http.material_equipo_area_agregar(material_equipo).subscribe((id) => {
            material_equipo.material_equipo_area_id = JSON.parse(JSON.stringify(id)).id;
            equipoArea.materiales.push(material_equipo);
            return;
          });
        }
      });
    });
    this.equipoChild.actualizarTotal();
  }
  constructor(private http: HttpService) { }
  ngOnInit() {

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

