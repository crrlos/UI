import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ubicacion, Equipo } from '../interfaces';
@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html',
  styleUrls: ['./equipo-child.component.css']
})
export class EquipoChildComponent implements OnInit {

  @Input() ubicacion: Ubicacion;
  @Output() notificar = new EventEmitter<boolean>();

  equipos: Equipo[];
  txtBuscar: String;
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  checked = false;
  ubicacionSeleccionada: Ubicacion;
  cambioUbicacion: Ubicacion = {};

  editaEquipo = false;
  actualizar() {
    this.equipos_filtro = this.equipos.filter(f => {
      return f.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase());
    });
  }
  constructor() { }
  agregarEquipo() {
    this.ubicacion.equipos.push({
      nombre: 'eq 1',
      precio: 1000,
      porcentaje: 1,
      total: 100,
      materiales: []
    });
    this.actualizarTotal();
  }
  agregarMaterial(equipo: Equipo) {
    equipo.materiales.push({
      cantidad: 10,
      precio: 10,
      nombre: 'material 1',
      codigo: 1
    });
    this.actualizarTotal();
  }
  ngOnInit() {
    this.equipos_filtro = this.equipos;
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
  //  se actualiza el total($$) del área a la que pertenece el equipo, sumando valor de los equipos más los materiales
  actualizarTotal() {
    let total_general = 0;
    this.ubicacion.equipos.forEach(e => {
      let total_materiales_equipo = 0;
      // se suman los materiales
      e.materiales.forEach(m => {
        total_materiales_equipo += m.cantidad * m.precio;
      });
      e.total = total_materiales_equipo + e.precio * e.porcentaje;
      total_general += e.total; // valor del equipo
    });
    this.ubicacion.total = total_general; // se actualiza el total de la ubicación
    this.notificar.emit(true); // notificar al padre para que actualice los totales
  }
}
