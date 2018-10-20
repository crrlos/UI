import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Area, Equipo, Material, EquipoArea } from '../interfaces';
import { equipos, materiales } from '../datos';
declare var Metro;
@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html',
  styleUrls: ['./equipo-child.component.css']
})
export class EquipoChildComponent implements OnInit {

  @Input() areas: Area[];
  @Input() area: Area;
  @Output() notificar = new EventEmitter<boolean>();
  ubicacionSeleccionada: Area;

  equipos: Equipo[];
  equipos_lista: EquipoArea[];
  materiales_lista: Material[];
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  cambioUbicacion: Area = {};

  timeout_id;

  editaEquipo = false;

  f(eq) {
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
  agregarEquipo(equipo: Equipo) {
    const equi: Equipo = JSON.parse(JSON.stringify(equipo));
    equi.total_materiales_modificado = 0;
    this.area.equipos_area.push({ equipo: equipo });
    this.actualizarTotal();
  }
  agregarMaterial(material: Material, equipo: Equipo) {
    const m: Material = JSON.parse(JSON.stringify(material));
    m.cantidad = 1;
    m.porcentaje = 1;
    equipo.materiales.push(m);
    this.actualizarTotal();
  }
  ngOnInit() {
    this.ubicacionSeleccionada = this.area;
    this.equipos_filtro = this.equipos;
    this.equipos_lista = this.area.equipos_area;
    this.materiales_lista = materiales;


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
        this.ubicacionSeleccionada = this.area;
      });
      return;
    }
    this.area.equipos_area.splice(this.area.equipos_area.indexOf(equipo));
    this.ubicacionSeleccionada.equipos_area.push(equipo);
    this.ubicacionSeleccionada = this.area;
    this.actualizarTotal();
  }
}
