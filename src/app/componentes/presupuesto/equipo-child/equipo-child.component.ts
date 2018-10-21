import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Area, Equipo, Material, EquipoArea } from '../../../interfaces/interfaces';
import { equipos, materiales } from '../../../datos';
declare var Metro;
@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html'
})
export class EquipoChildComponent implements OnInit {

  @Input() areas: Area[];
  @Input() area: Area;
  @Output() notificar = new EventEmitter<boolean>();

  areaSeleccionada: Area;


  materiales_lista: Material[];
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  cambioUbicacion: Area = {};

  timeout_id;

  editaEquipo = false;

  f(eq, equipo?: EquipoArea) {
    this.areas.forEach(area => {
      area.insertar_equipo = false;
      area.equipos.forEach(e => e.insertar_material = false);
    });

    this.area.insertar_equipo = true;

    if (equipo) {
      equipo.insertar_material = true;
    }
    Metro.dialog.open(eq);
  }
  actualizar_total_personalizado() {
    if (this.timeout_id) {
      clearTimeout(this.timeout_id);
      this.timeout_id = null;
    }
    this.timeout_id = setTimeout(() => { this.actualizarTotal(); }, 1000);
  }
  eliminarMaterial(equipo: Equipo, material: Material) {
    equipo.materiales.splice(equipo.materiales.indexOf(material), 1);
    this.actualizarTotal();
  }
  constructor() { }
  ngOnInit() {
    this.areaSeleccionada = this.area;

    this.materiales_lista = materiales;
    this.actualizarTotal();

  }
  obtener(equipo) {
    this.equipoSeleccionado = equipo;
  }
  totalMateriales(equipo: Equipo) {
    let total = 0;
    equipo.materiales.forEach(material => {
      total += material.precio * material.cantidad;
    });
    return total;
  }
  // Se hace una actualización de totales($$$) a todas las áreas
  actualizarTotal() {
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
  moverEquipo(equipo: Equipo) {
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
