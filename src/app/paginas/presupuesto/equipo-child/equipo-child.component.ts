import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Area, Equipo, Material, EquipoArea, MaterialEquipoArea } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { ConfirmationService } from 'primeng/api';
import { EquipoAreaHttpService } from 'src/app/servicios/http/equipo-area.service';
import { MaterialEquipoAreaHttpService } from 'src/app/servicios/http/material-equipo-area.service';

@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html'
})
export class EquipoChildComponent implements OnInit {

  @Input() areas: Area[];
  @Input() area: Area;
  @Output() total_general = new EventEmitter<number>();
  @Output() mostrar_dialogo_equipos = new EventEmitter<any>();
  @Output() mostrar_dialogo_materiales = new EventEmitter<any>();

  areaSeleccionada: Area;

  materiales_lista: Material[];
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  cambioUbicacion: Area = {};

  timeout_id: any;

  constructor(private http: HttpService, private confirmationService: ConfirmationService,
    private equipoAreaHttp: EquipoAreaHttpService,
    private materialEquipoAreaHttp: MaterialEquipoAreaHttpService) { }
  ngOnInit() {
    this.areaSeleccionada = this.area;
  }

  f(agregar_equipo: boolean, equipo?: EquipoArea) {
    // se muestra el diálogo según si se va a agregar un equipo o un material
    if (agregar_equipo) {
      this.mostrar_dialogo_equipos.emit({ area: this.area });
    } else {
      this.mostrar_dialogo_materiales.emit({ equipo: equipo });
    }
  }
  actualizar_total_personalizado(equipo: EquipoArea) {
    if (this.timeout_id) {
      clearTimeout(this.timeout_id);
      this.timeout_id = null;
    }
    this.timeout_id = setTimeout(() => {
      this.equipoAreaHttp.actualizar(equipo).subscribe(() => {
        this.actualizarTotalesEquipo(equipo, true, true);
        this.actualizarTotal();
      });

    }, 1000);
  }
  eliminarMaterial(equipo: EquipoArea, material: MaterialEquipoArea) {
    this.materialEquipoAreaHttp.eliminar(material).subscribe(() => {
      equipo.materiales.splice(equipo.materiales.indexOf(material), 1);
      this.actualizarTotal();
    });
  }

  totalMateriales(equipo: EquipoArea) {
    let total = 0;
    equipo.materiales.forEach(material => {
      total += material.precio * material.cantidad * material.porcentajeGanancia;
    });
    return total;
  }

  actualizarPorcentajeGanancia(equipo: EquipoArea) {

    this.actualizarTotalesEquipo(equipo, false, true);
    this.actualizarTotal();
    this.actualizarTotalPersonalizado(equipo);

  }
  actualizarTotalAsyncMaterial(material: MaterialEquipoArea, equipoArea: EquipoArea) {
    this.materialEquipoAreaHttp.actualizar(material).subscribe(() => {
      this.actualizarTotalesEquipo(equipoArea, true, false);
      this.actualizarTotal();
      this.actualizarTotalPersonalizado(equipoArea);
    });
  }
  // Esta función actualiza el total de un equipo de un equipo (  precio equipo + materiales)
  // tomando en cuenta los totales personalizados para no sobreescribirlos cuando se agrega o elimina
  // un material
  actualizarTotalesEquipo(equipoArea: EquipoArea, conservar_total_equipo: boolean,
    conservar_total_material: boolean) {
    let total_materiales = 0;
    equipoArea.materiales.forEach(material => {
      total_materiales += material.precio * material.cantidad * material.porcentajeGanancia * 1;
    });
    if (equipoArea.precioMaterialesEquipo < total_materiales || total_materiales === 0) {
      equipoArea.precioMaterialesEquipo = total_materiales;
    }
    if (equipoArea.precioMaterialesEquipo > total_materiales && !conservar_total_material) {
      equipoArea.precioMaterialesEquipo = total_materiales;
    }
    equipoArea.total = equipoArea.precioEquipo * equipoArea.porcentajeGanancia
      + equipoArea.precioMaterialesEquipo * 1;

    if (equipoArea.precioTotalPersonalizado < equipoArea.total) {
      equipoArea.precioTotalPersonalizado = equipoArea.total;
    }
    if (equipoArea.precioTotalPersonalizado > equipoArea.total && !conservar_total_equipo) {
      equipoArea.precioTotalPersonalizado = equipoArea.total;
    }
    equipoArea.costoBTU = equipoArea.total / ((equipoArea.equipo.capacidad) / 12000); // 12,000 BTU = 1 T
  }
  // Esta función suma solo los totales personalizados de cada equipo por área para obtener el total general
  actualizarTotal() {
    let total_general = 0;

    this.areas.forEach(area => {
      area.total = 0;
      area.equipos.forEach(equipo_area => {
        area.total += equipo_area.precioTotalPersonalizado * 1; // *1 convierte a number
      });
      total_general += area.total;
    });
    this.total_general.emit(total_general); // notificar al padre el nuevo total
  }
  moverEquipo(equipo: EquipoArea) {
    this.confirmationService.confirm({
      message: 'Desea mover este equipo?',
      accept: () => {
        setTimeout(() => {
          this.areaSeleccionada = this.area;
        });
      }
    });
    this.area.equipos.splice(this.area.equipos.indexOf(equipo));
    this.areaSeleccionada.equipos.push(equipo);
    this.areaSeleccionada = this.area;
    this.actualizarTotal();
  }
  duplicarEquipo(equipo: EquipoArea) {
    this.equipoAreaHttp.duplicar(equipo).subscribe((done: EquipoArea) => {
      this.area.equipos.push(done);
      this.actualizarTotalesEquipo(done, true, true);
      this.actualizarTotal();
    });
  }
  confirmDuplicar(equipo: EquipoArea) {
    this.confirmationService.confirm({
      message: 'Desea duplicar este equipo?',
      accept: () => {
        this.duplicarEquipo(equipo);
      }
    });
  }
  confirmEliminar(equipo: EquipoArea) {
    this.confirmationService.confirm({
      message: 'Desea eliminar este equipo?',
      accept: () => {
        this.eliminarEquipo(equipo);
      }
    });
  }
  eliminarEquipo(equipo: EquipoArea) {
    this.equipoAreaHttp.eliminar(equipo).subscribe(() => {
      this.area.equipos.splice(this.area.equipos.indexOf(equipo), 1);
      // this.actualizarTotalesEquipo(equipo, true, true);
      this.actualizarTotal();
    });
  }
  actualizarTotalPersonalizado(equipoArea: EquipoArea) {
    this.equipoAreaHttp.actualizar(equipoArea).subscribe();
  }
}
