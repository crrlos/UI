import { Component, OnInit, Input } from '@angular/core';
import { Equipo, Ubicacion, EquipoUbicacion, EquipoUbicacionMaterial, Material } from '../interfaces';
@Component({
  selector: 'app-material-child',
  templateUrl: './material-child.component.html'
})
export class MaterialChildComponent implements OnInit {
  @Input() equipos: Equipo[];
  @Input() ubicaciones: Ubicacion[];
  @Input() equipo_ubicacion: EquipoUbicacion[];

  equipo_ubicacion_material: EquipoUbicacionMaterial[] = [];
  materiales: Material[] = [];
  materiales_copia: Material[] = [];
  ubicacionSeleccionada: Ubicacion = {};
  equipoSeleccionado: EquipoUbicacion = {};
  materialElegido: Material = {};

  equipos_ubicacion: Equipo[] = [];

  txtBuscar;
  txtCantidad;
  mostrar = false;

  actualizarEquipos() {
    this.equipos_ubicacion = [];
    this.equipo_ubicacion.forEach(eu => {
      if (eu.ubicacion === this.ubicacionSeleccionada.codigo) {
        this.equipos_ubicacion.push(this.equipos.find(e => e.codigo === eu.equipo));
      }
    });
  }
  agregarMaterial() {
    this.equipo_ubicacion_material.push({
      codigo: 1,
      equipo_ubicacion: this.equipoSeleccionado,
      material: this.materialElegido,
      cantidad: this.txtCantidad
    });
    console.log(this.equipo_ubicacion_material);
  }
  obtenerMaterial(material: Material) {
    this.materialElegido = material;
  }
  mostrarF() {
    this.mostrar = !this.mostrar;
  }
  actualizar() {
    this.materiales = this.materiales_copia.filter(f => f.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase()));
  }
  ngOnInit() {
    this.materiales_copia.push({
      codigo: 1, nombre: 'material 1', precio: 10,
    }, {
        codigo: 2, nombre: 'material 2', precio: 20
      });
    this.materiales = this.materiales_copia;
  }
}
