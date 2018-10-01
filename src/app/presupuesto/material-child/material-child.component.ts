import { Component, OnInit, Input } from '@angular/core';
import { Ubicacion, EquipoUbicacion, EquipoUbicacionMaterial, Material } from '../interfaces';
@Component({
  selector: 'app-material-child',
  templateUrl: './material-child.component.html'
})
export class MaterialChildComponent implements OnInit {
  @Input() ubicaciones: Ubicacion[];
  @Input() equipo_ubicacion: EquipoUbicacion[];

  equipo_ubicacion_material: EquipoUbicacionMaterial[] = [];
  equipo_ubicacion_material_filtrado: EquipoUbicacionMaterial[] = [];
  materiales: Material[] = [];
  materiales_copia: Material[] = [];
  ubicacionSeleccionada: Ubicacion = {};
  equipoUbicacionSeleccionado: EquipoUbicacion = {};
  materialElegido: Material = {};
  // almacena los equipos que pertenecen a la ubicación seleccionada
  equipos_ubicacion: EquipoUbicacion[] = [];

  txtBuscar;
  txtCantidad;
  mostrar = false;

  actualizarEquipos() {
    this.equipo_ubicacion_material_filtrado = [];
    this.equipos_ubicacion = [];
    this.equipo_ubicacion.forEach(eu => {
      if (eu.ubicacion === this.ubicacionSeleccionada) {
        this.equipos_ubicacion.push(eu);
      }
    });
  }
  filtrarMaterialEquipo() {
    this.equipo_ubicacion_material_filtrado = [];
    this.equipo_ubicacion_material_filtrado =
      this.equipo_ubicacion_material.filter(e => e.equipo_ubicacion === this.equipoUbicacionSeleccionado);
  }
  agregarMaterial() {
    if (this.actualizarMaterialRepetido()) {
      return;
    }
    this.equipo_ubicacion_material.push({
      codigo: 1,
      equipo_ubicacion: this.equipoUbicacionSeleccionado,
      material: this.materialElegido,
      cantidad: Number.parseInt(this.txtCantidad)
    });
    this.filtrarMaterialEquipo();
  }
  actualizarMaterialRepetido() {
    const equipos = this.equipo_ubicacion_material.filter(e => e.equipo_ubicacion === this.equipoUbicacionSeleccionado);
    if (equipos.length > 0) {
      const material = equipos.find(e => e.material === this.materialElegido);
      if (material) {
        material.cantidad += Number.parseInt(this.txtCantidad);
        return true;
      }
    }
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
