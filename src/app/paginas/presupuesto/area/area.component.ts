import { Component, OnInit, ViewChild } from '@angular/core';
import { Area, Equipo, EquipoArea, Material, MaterialEquipoArea } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { EquipoChildComponent } from 'src/app/paginas/presupuesto/equipo-child/equipo-child.component';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AreaHttpService } from 'src/app/servicios/http/areas.service';
import { EquipoAreaHttpService } from 'src/app/servicios/http/equipo-area.service';
import { MaterialEquipoAreaHttpService } from 'src/app/servicios/http/material-equipo-area.service';
declare var customjs;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {
  @ViewChild(EquipoChildComponent)
  private equipoChild: EquipoChildComponent;

  mostrarDialogo: boolean = false;
  nombreArea:string;
  areas: Area[] = [];
  totalGeneral = 0;
  equipos_lista: Equipo[];
  materiales_lista: Material[];
  cotizacionId: number;

  mostrar_dialogo_equipos: boolean;
  mostrar_dialogo_materiales: boolean;

  // almacenan los valores emitidos por equipo-child
  area: Area;
  equipoArea: EquipoArea;

  constructor(
    private areaHttp: AreaHttpService, 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private equipoAreaHttp: EquipoAreaHttpService,
    private materialEquipoAreaHttp: MaterialEquipoAreaHttpService
    ) { }

  mostrarDialogoArea(){
      this.mostrarDialogo = true;
      this.nombreArea = "";

  }
  mostrarDialogoEquipo(event: any) {
    this.mostrar_dialogo_equipos = true;
    this.area = event.area;
  }
  mostrarDialogoMaterial(event: any) {
    this.mostrar_dialogo_materiales = true;
    this.equipoArea = event.equipo;
  }

  agregarArea() {
    this.mostrarDialogo = false;

    this.areaHttp.agregar({nombre: this.nombreArea, cotizacionId : this.cotizacionId})
      .subscribe((id: any) => {
      this.areas.push({
        id: id.id,
        nombre: this.nombreArea,
        equipos: []
      });
    });
  }
  actualizarArea(area: Area) {
    const data = { nombre: area.nombre, area_id: area.id, cotizacion: this.cotizacionId };
    this.areaHttp.actualizar(data).subscribe();
  }
  eliminarArea(area: Area) {
    this.areaHttp.eliminar(area).subscribe(() => {
      this.areas.splice(this.areas.indexOf(area), 1);
    });
  }
  agregarEquipo(equipo: Equipo) {

    const equipo_area: EquipoArea = {
      equipoId: equipo.id,
      areaId: this.area.id,
      precioEquipo: equipo.precio,
      porcentajeGanancia: 1,
      precioMaterialesEquipo: 0,
      precioTotalPersonalizado: equipo.precio,
      materiales: [],
      equipo: equipo,
      total: equipo.precio
    };
    this.equipoAreaHttp.agregar(equipo_area).subscribe((id: any) => {
      equipo_area.id = id.id;
      this.area.equipos.push(equipo_area);
      this.equipoChild.actualizarTotalesEquipo(equipo_area, false, false);
      this.equipoChild.actualizarTotal();
      this.messageService.add({ severity: 'success', summary: 'Equipo agregado', detail: 'El equipo se agregó correctamente' });
    });

  }
  agregarMaterial(material: Material) {
    const material_equipo: MaterialEquipoArea = {
      id: material.id,
      equiposAreaId: this.equipoArea.id,
      cantidad: 1,
      precio: material.precio,
      porcentajeGanancia: 1,
      material: material
    };
    this.materialEquipoAreaHttp.agregar(material_equipo).subscribe((id: any) => {
      material_equipo.id = id.id;
      this.equipoArea.materiales.push(material_equipo);
      this.equipoChild.actualizarTotalesEquipo(this.equipoArea, false, false);
      this.equipoChild.actualizarTotal();
      this.equipoChild.actualizarTotalPersonalizado(this.equipoArea);
      this.messageService.add({ severity: 'success', summary: 'Material agregado', detail: 'El material se agregó correctamente' });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cotizacionId = params['id'];
      this.areaHttp.areas(this.cotizacionId).subscribe(success => {
        this.areas = success;
        console.log(this.areas);
        this.inicializarTotales();
        customjs();
      });
    });
  }
  inicializarTotales() {
    setTimeout(() => {
      this.areas.forEach(area => {
        area.equipos.forEach(equipo => {
          this.equipoChild.actualizarTotalesEquipo(equipo, true, true);
        });
      });
      this.equipoChild.actualizarTotal();
    });
  }
}
