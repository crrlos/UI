import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Area, Equipo, Material, EquipoArea, MaterialEquipoArea } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
declare var Metro;
@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html'
})
export class EquipoChildComponent implements OnInit {

  @Input() areas: Area[];
  @Input() area: Area;
  @Output() notificar = new EventEmitter<boolean>();
  @Output() mostrar_dialogo_equipos = new EventEmitter<boolean>();
  @Output() mostrar_dialogo_materiales = new EventEmitter<boolean>();

  areaSeleccionada: Area;


  materiales_lista: Material[];
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  cambioUbicacion: Area = {};

  timeout_id;

  editaEquipo = false;

  f(materiales: boolean, equipo?: EquipoArea) {
    this.areas.forEach(area => {
      area.insertar_equipo = false;
      area.equipos.forEach(e => e.insertar_material = false);
    });

    this.area.insertar_equipo = true;

    if (equipo) {
      equipo.insertar_material = true;
    }

    if (materiales) {
      this.mostrar_dialogo_equipos.emit(true);
    } else {
      this.mostrar_dialogo_materiales.emit(true);
    }
  }
  actualizar_total_personalizado() {
    if (this.timeout_id) {
      clearTimeout(this.timeout_id);
      this.timeout_id = null;
    }
    this.timeout_id = setTimeout(() => { this.actualizarTotal(true); }, 1000);
  }
  eliminarMaterial(equipo: EquipoArea, material: MaterialEquipoArea) {
    this.http.material_equipo_area_eliminar(material).subscribe(() => {
      equipo.materiales.splice(equipo.materiales.indexOf(material), 1);
      this.actualizarTotal();
    });
  }
  constructor(private http: HttpService) { }
  ngOnInit() {
    this.areaSeleccionada = this.area;

    this.actualizarTotal();

  }
  totalMateriales(equipo: EquipoArea) {
    let total = 0;
    equipo.materiales.forEach(material => {
      total += material.precio * material.cantidad;
    });
    return total;
  }
  actualizarTotalAsync(equipo) {
    this.http.equipos_area_actualizar(equipo).subscribe(() => {
      this.actualizarTotal();
    });
  }
  actualizarTotalAsyncMaterial(material) {
    this.http.material_equipo_area_actualizar(material).subscribe(() => {
      this.actualizarTotal();
    });
  }
  // Se hace una actualización de totales($$$) a todas las áreas
  actualizarTotal(conservar_total_ajustado?: boolean) {
    let total_general = 0;

    this.areas.forEach(area => {
      total_general = 0;

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
        equipo_area.total = Number.parseFloat(equipo_area.precio_materiales_equipo)
          + equipo_area.precio_equipo * equipo_area.porcentaje_ganancia;
        total_general += equipo_area.total; // valor del equipo
      });
      area.total = total_general;
    });
    this.notificar.emit(true); // notificar al padre para que actualice los totales
  }
  moverEquipo(equipo: EquipoArea) {
    const r = confirm('está seguro que desea mover de área este equipo?');
    if (!r) {
      setTimeout(() => {
        this.areaSeleccionada = this.area;
      });
      return;
    }
    this.area.equipos.splice(this.area.equipos.indexOf(equipo));
    this.areaSeleccionada.equipos.push(equipo);
    this.areaSeleccionada = this.area;
    this.actualizarTotal();
  }
}
