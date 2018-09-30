import { Component, OnInit, Input } from '@angular/core';
import { Ubicacion } from '../interfaces';
@Component({
  selector: 'app-ubicacion-child',
  templateUrl: './ubicacion-child.component.html'
})
export class UbicacionChildComponent implements OnInit {

  ubicacion: String;
  @Input() ubicaciones: Ubicacion[] = [];
  ubicacionActual: Ubicacion;
  ubicacionCopia: Ubicacion;
  agregarUbicacion() {
    this.ubicaciones.push({ codigo: this.ubicaciones[this.ubicaciones.length - 1].codigo + 1, nombre: this.ubicacion, isEditable: false });
  }
  editar(codigo) {
    if (this.ubicacionActual) {
      this.ubicacionActual.isEditable = false;
    }
    this.ubicacionActual = this.ubicaciones.find(f => f.codigo === codigo);
    this.ubicacionCopia = JSON.parse(JSON.stringify(this.ubicacionActual));
    this.ubicacionActual.isEditable = true;
  }
  guardar() {
    if (this.ubicacionActual) {
      this.ubicacionActual.isEditable = false;
    }
  }
  cancelar() {

    if (this.ubicacionActual) {
      this.ubicacionActual.isEditable = false;
    }
    this.ubicacionActual.nombre = this.ubicacionCopia.nombre;
  }
  constructor() {

  }
  ngOnInit() {
    this.ubicaciones.push({ codigo: 1, nombre: 'Ubicacion 1', isEditable: false },
      { codigo: 2, nombre: 'Ubicacion 2', isEditable: false });
  }


}
