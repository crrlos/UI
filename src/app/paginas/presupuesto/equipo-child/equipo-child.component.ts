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

  editaEquipo = false;

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
        this.actualizarTotal(true);
      });

    }, 1000);
  }
  eliminarMaterial(equipo: EquipoArea, material: MaterialEquipoArea) {
    this.http.material_equipo_area_eliminar(material).subscribe(() => {
      equipo.materiales.splice(equipo.materiales.indexOf(material), 1);
      this.actualizarTotal();
    });
  }
  constructor(private http: HttpService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.areaSeleccionada = this.area;

    this.actualizarTotal(true);

  }
  totalMateriales(equipo: EquipoArea) {
    let total = 0;
    equipo.materiales.forEach(material => {
      total += material.precio * material.cantidad * material.porcentaje_ganancia;
    });
    return total;
  }
  actualizarPorcentajeGanancia(equipo: EquipoArea) {
    this.http.equipos_area_actualizar(equipo).subscribe(() => {
      this.actualizarTotal(true);
    });
  }
  actualizarTotalAsyncMaterial(material: MaterialEquipoArea) {
    this.http.material_equipo_area_actualizar(material).subscribe(() => {
      this.actualizarTotal();
    });
  }
  // Se hace una actualización de totales($$$) a todas las áreas
  actualizarTotal(conservar_total_ajustado?: boolean) {
    let total_general = 0;

    this.areas.forEach(area => {
      area.total = 0;
      area.equipos.forEach(equipo_area => {
        let total_materiales_equipo = 0;

        equipo_area.materiales.forEach(material => {
          total_materiales_equipo += material.cantidad * material.precio * material.porcentaje_ganancia;
        });
        // evita que se sobreescriba el valor ingresado manualmente
        if (equipo_area.precio_materiales_equipo < total_materiales_equipo) {
          equipo_area.precio_materiales_equipo = total_materiales_equipo;
        } else if (equipo_area.precio_materiales_equipo > total_materiales_equipo && !conservar_total_ajustado) {
          equipo_area.precio_materiales_equipo = total_materiales_equipo;
        }


        if (total_materiales_equipo === 0) {
          equipo_area.precio_materiales_equipo = 0;
        }
        equipo_area.total = equipo_area.precio_materiales_equipo
          + equipo_area.precio_equipo * equipo_area.porcentaje_ganancia;
        area.total += equipo_area.total; // valor del equipo
        total_general += area.total;
      });
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
      this.actualizarTotal();
    });
  }
  confirm(equipo: EquipoArea) {
    this.confirmationService.confirm({
      message: 'Desea duplicar este equipo?',
      accept: () => {
        this.duplicarEquipo(equipo);
      }
    });
  }
}
