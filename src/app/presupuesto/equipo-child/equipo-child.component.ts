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
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  cambioUbicacion: Ubicacion = {};

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
    this.ubicacion.equipos.push(equi);
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

    this.ubicaciones.forEach(ubicacion => {
      total_general = 0;

      ubicacion.equipos.forEach(equipo => {
        let total_materiales_equipo = 0;

        equipo.materiales.forEach(material => {
          total_materiales_equipo += material.cantidad * material.precio * material.porcentaje;
        });
        // evita que se sobreescriba el valor ingresado manualmente
        if (equipo.total_materiales_modificado < total_materiales_equipo) {
          equipo.total_materiales_modificado = total_materiales_equipo;
        }

        if (total_materiales_equipo === 0) {
          equipo.total_materiales_modificado = 0;
        }
        equipo.total = Number.parseFloat(equipo.total_materiales_modificado) + equipo.precio * equipo.porcentaje;
        total_general += equipo.total; // valor del equipo
      });
      ubicacion.total = total_general;
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
