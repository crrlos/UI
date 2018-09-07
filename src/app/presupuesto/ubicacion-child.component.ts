import { Component, OnInit, Input } from '@angular/core';
import {Ubicacion} from './clases';
@Component({
  selector: 'app-ubicacion-child',
  templateUrl: './ubicacion-child.component.html'
})
export class UbicacionChildComponent {

  ubicacion: String;
  @Input() ubicaciones: Ubicacion[] = [];
  ubicacionActual: Ubicacion;
  ubicacionCopia: Ubicacion;
  agregarUbicacion() {
    this.ubicaciones.push({ codigo: this.ubicaciones[this.ubicaciones.length - 1].codigo + 1, nombre: this.ubicacion, isEditable: false });
  }
  editar(codigo) {
    if (this.ubicacionActual)
      this.ubicacionActual.isEditable = false;
    this.ubicacionActual = this.ubicaciones.find(f => { return f.codigo == codigo; });
    this.ubicacionCopia = JSON.parse(JSON.stringify(this.ubicacionActual));
    this.ubicacionActual.isEditable = true;
  }
  guardar() {
    if (this.ubicacionActual)
      this.ubicacionActual.isEditable = false;
  }
  cancelar() {

    if (this.ubicacionActual)
      this.ubicacionActual.isEditable = false;
    this.ubicacionActual.nombre = this.ubicacionCopia.nombre;
  }
  constructor() {

  }


}
