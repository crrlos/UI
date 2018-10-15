import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ubicacion, Equipo, Material } from '../interfaces';
import { equipos, materiales } from '../datos';
declare var Metro;
@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html',
  styleUrls: ['./equipo-child.component.css']
})
export class EquipoChildComponent implements OnInit {

  @Input() ubicaciones: Ubicacion[];
  @Input() ubicacion: Ubicacion;
  @Output() notificar = new EventEmitter<boolean>();
  ubicacionSeleccionada: Ubicacion;

  equipos: Equipo[];
  equipos_lista: Equipo[];
  materiales_lista: Material[];
  txtBuscar: String;
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  checked = false;
  cambioUbicacion: Ubicacion = {};

  editaEquipo = false;
  f(eq) {
    Metro.dialog.open(eq);
  }
  actualizar() {
    this.equipos_filtro = this.equipos.filter(f => {
      return f.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase());
    });
  }
  eliminarMaterial(equipo: Equipo, material: Material) {
    equipo.materiales.splice(equipo.materiales.indexOf(material), 1);
    this.actualizarTotal();
  }
  constructor() { }
  agregarEquipo(equipo) {
    this.ubicacion.equipos.push(equipo);
    this.actualizarTotal();
  }
  agregarMaterial(material: Material, equipo: Equipo) {
    const m: Material = JSON.parse(JSON.stringify(material));
    m.cantidad = 1;
    equipo.materiales.push(m);
    this.actualizarTotal();
  }
  ngOnInit() {
    this.ubicacionSeleccionada = this.ubicacion;
    this.equipos_filtro = this.equipos;
    this.equipos_lista = equipos;
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
    // Se recorre cada área
    this.ubicaciones.forEach(ubicacion => {
      total_general = 0;
      // Se recorren los equipos del área
      ubicacion.equipos.forEach(equipo => {
        let total_materiales_equipo = 0;
        // se suman los materiales por equipo
        equipo.materiales.forEach(m => {
          total_materiales_equipo += m.cantidad * m.precio;
        });
        equipo.total = total_materiales_equipo + equipo.precio * equipo.porcentaje;
        total_general += equipo.total; // valor del equipo
      });
      ubicacion.total = total_general; // se actualiza el total de la ubicación
    });
    this.notificar.emit(true); // notificar al padre para que actualice los totales
  }
  moverEquipo(equipo: Equipo) {
    const r = confirm('está seguro que desea mover de área este equipo?');
    if (!r) {
      setTimeout(() => {
        this.ubicacionSeleccionada = this.ubicacion;
      });
      return;
    }
    this.ubicacion.equipos.splice(this.ubicacion.equipos.indexOf(equipo));
    this.ubicacionSeleccionada.equipos.push(equipo);
    this.ubicacionSeleccionada = this.ubicacion;
    this.actualizarTotal();
  }
}
