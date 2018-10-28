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

  equipos: Equipo[];
  equipo: Equipo;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

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
          precio_equipo: equipo.equipo_precio,
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
    this.equipoChild.actualizarTotal();
  }
  agregarMaterial(material: Material) {
    this.areas.forEach(area => {
      area.equipos.forEach(equipoArea => {
        if (equipoArea.insertar_material) {
          const material_equipo: MaterialEquipoArea = {
            id_material: material.material_id,
            id_equipo_area: equipoArea.id,
            cantidad: 1,
            precio: material.material_precio,
            porcentaje_ganancia: 1,
            material: material
          };
          equipoArea.materiales.push(material_equipo);
          return;
        }
      });
    });
    this.equipoChild.actualizarTotal();
  }
  constructor(private http: HttpService) { }
  loadLazy(event) {
    this.http.equipos(event).subscribe(data => {
      this.equipos = data.equipos;
      this.totalRecords = data.totalRecords;
    });
  }
  ngOnInit() {

    this.http.areas().subscribe(success => {
      this.areas = success;
    });
    this.cols = [
      { field: 'equipo_codigo', header: 'codigo' },
      { field: 'equipo_nombre', header: 'nombre' },
      { field: 'equipo_precio', header: 'precio' },
      { field: 'capacidad', header: 'capacidad' },
      { field: 'marca', header: 'marca' },
      { field: 'tipo', header: 'tipo' },
      { field: 'voltaje', header: 'V' }
    ];
    this.selectedColumns = this.cols;
  }
  onNotificacion() {
    this.totalGeneral = 0;
    this.areas.forEach(area => {
      this.totalGeneral += isNumber(area.total) ? area.total : 0;
    });
  }
  onRowSelect(event) {
    this.equipo = JSON.parse(JSON.stringify(event.data));
    this.agregarEquipo(this.equipo);
  }


}

