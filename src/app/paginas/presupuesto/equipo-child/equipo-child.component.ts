import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Area, Equipo, Material, EquipoArea, MaterialEquipoArea } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { ConfirmationService } from 'primeng/api';

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

  constructor(private http: HttpService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.areaSeleccionada = this.area;
  }

  f(materiales: boolean, equipo?: EquipoArea) {
    // se muestra el diálogo según si se va a agregar un equipo o un material
    if (materiales) {
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
      this.http.equipos_area_actualizar(equipo).subscribe(() => {
        this.actualizarTotalesEquipo(equipo, true, true);
        this.actualizarTotal();
      });

    }, 1000);
  }
  eliminarMaterial(equipo: EquipoArea, material: MaterialEquipoArea) {
    this.http.material_equipo_area_eliminar(material).subscribe(() => {
      equipo.materiales.splice(equipo.materiales.indexOf(material), 1);
      this.actualizarTotal();
    });
  }

  totalMateriales(equipo: EquipoArea) {
    let total = 0;
    equipo.materiales.forEach(material => {
      total += material.precio * material.cantidad * material.porcentaje_ganancia;
    });
    return total;
  }

  actualizarPorcentajeGanancia(equipo: EquipoArea) {

    this.actualizarTotalesEquipo(equipo, false, true);
    this.actualizarTotal();
    this.actualizarTotalPersonalizado(equipo);

  }
  actualizarTotalAsyncMaterial(material: MaterialEquipoArea, equipoArea: EquipoArea) {
    this.http.material_equipo_area_actualizar(material).subscribe(() => {
      this.actualizarTotalesEquipo(equipoArea, true, false);
      this.actualizarTotal();
      this.actualizarTotalPersonalizado(equipoArea);
    });
  }
  actualizarTotalesEquipo(equipoArea: EquipoArea, conservar_total_equipo: boolean,
    conservar_total_material: boolean) {
    let total_materiales = 0;
    equipoArea.materiales.forEach(material => {
      total_materiales += material.precio * material.cantidad * material.porcentaje_ganancia * 1;
    });
    if (equipoArea.precio_materiales_equipo < total_materiales || total_materiales === 0) {
      equipoArea.precio_materiales_equipo = total_materiales;
    }
    if (equipoArea.precio_materiales_equipo > total_materiales && !conservar_total_material) {
      equipoArea.precio_materiales_equipo = total_materiales;
    }
    equipoArea.total = equipoArea.precio_equipo * equipoArea.porcentaje_ganancia
      + equipoArea.precio_materiales_equipo * 1;

    if (equipoArea.precio_total_personalizado < equipoArea.total) {
      equipoArea.precio_total_personalizado = equipoArea.total;
    }
    if (equipoArea.precio_total_personalizado > equipoArea.total && !conservar_total_equipo) {
      equipoArea.precio_total_personalizado = equipoArea.total;
    }
    equipoArea.costo_btu = equipoArea.total / (equipoArea.equipo.capacidad / 12000); // 12,000 BTU = 1 T
  }
  // Se hace una actualización de totales($$$) a todas las áreas
  actualizarTotal() {
    let total_general = 0;

    this.areas.forEach(area => {
      area.total = 0;
      area.equipos.forEach(equipo_area => {
        area.total += equipo_area.precio_total_personalizado * 1;
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
    this.http.equipo_duplicar(equipo).subscribe((done: EquipoArea) => {
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
    this.http.equipos_area_eliminar(equipo).subscribe(() => {
      this.area.equipos.splice(this.area.equipos.indexOf(equipo));
    });
  }
  actualizarTotalPersonalizado(equipoArea: EquipoArea) {
    this.http.equipos_area_actualizar(equipoArea).subscribe();
  }
}
