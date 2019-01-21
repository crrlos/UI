import { Component, OnInit, ViewChild } from '@angular/core';
import { Area, Equipo, EquipoArea, Material, MaterialEquipoArea } from '../../../interfaces/interfaces';
import { isNumber } from 'util';
import { HttpService } from '../../../servicios/http.service';
import { EquipoChildComponent } from '../equipo-child/equipo-child.component';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  id_cotizacion: number;

  mostrar_dialogo_equipos: boolean;
  mostrar_dialogo_materiales: boolean;

  // almacenan los valores emitidos por equipo-child
  area: Area;
  equipoArea: EquipoArea;

  mostrarDialogoEquipo(event: any) {
    this.mostrar_dialogo_equipos = true;
    this.area = event.area;
  }
  mostrarDialogoMaterial(event: any) {
    this.mostrar_dialogo_materiales = true;
    this.equipoArea = event.equipo;
  }

  agregarArea(area: string) {
    this.http.areas_agregar({ area: area, cotizacion: this.id_cotizacion }).subscribe((id: any) => {
      this.areas.push({
        area_id: id.id,
        nombre: area,
        equipos: []
      });
    });
  }
  actualizarArea(area: Area) {
    const data = { nombre: area.nombre, area_id: area.area_id, cotizacion: this.id_cotizacion };
    this.http.areas_actualizar(data).subscribe();
  }
  eliminarArea(area: Area) {
    this.http.areas_eliminar(area).subscribe(() => {
      this.areas.splice(this.areas.indexOf(area), 1);
    });
  }
  agregarEquipo(equipo: Equipo) {

    const equipo_area: EquipoArea = {
      id_equipo: equipo.equipo_id,
      id_area: this.area.area_id,
      precio_equipo: equipo.equipo_precio,
      porcentaje_ganancia: 1,
      precio_materiales_equipo: 0,
      precio_total_personalizado: equipo.equipo_precio,
      materiales: [],
      equipo: equipo,
      total: equipo.equipo_precio
    };
    this.http.equipos_area_agregar(equipo_area).subscribe((id: any) => {
      equipo_area.equipo_area_id = id.id;
      this.area.equipos.push(equipo_area);
      this.equipoChild.actualizarTotal();
      this.messageService.add({ severity: 'success', summary: 'Equipo agregado', detail: 'El equipo se agregó correctamente' });
    });

  }
  agregarMaterial(material: Material) {
    const material_equipo: MaterialEquipoArea = {
      id_material: material.material_id,
      id_equipo_area: this.equipoArea.equipo_area_id,
      cantidad: 1,
      precio: material.material_precio,
      porcentaje_ganancia: 1,
      material: material
    };
    this.http.material_equipo_area_agregar(material_equipo).subscribe((id: any) => {
      material_equipo.material_equipo_area_id = id.id;
      this.equipoArea.materiales.push(material_equipo);
      this.equipoChild.actualizarTotalesEquipo(this.equipoArea, false);
      this.equipoChild.actualizarTotal();
      this.equipoChild.actualizarTotalPersonalizado(this.equipoArea);
      this.messageService.add({ severity: 'success', summary: 'Material agregado', detail: 'El material se agregó correctamente' });
    });
  }
  constructor(private http: HttpService, private route: ActivatedRoute,
    private messageService: MessageService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_cotizacion = params['id'];
      this.http.areas(this.id_cotizacion).subscribe(success => {
        this.areas = success;
        this.inicializarTotales();
      });
    });
  }
  inicializarTotales() {
    setTimeout(() => {
      this.areas.forEach(area => {
        area.equipos.forEach(equipo => {
          this.equipoChild.actualizarTotalesEquipo(equipo, true);
        });
      });
      this.equipoChild.actualizarTotal();
    });
  }
}
