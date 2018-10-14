import { Component, OnInit, Input } from '@angular/core';
import { Ubicacion } from '../interfaces';
import { isNumber } from 'util';
@Component({
  selector: 'app-ubicacion-child',
  templateUrl: './ubicacion-child.component.html'
})
export class UbicacionChildComponent implements OnInit {

  ubicacion: String;
  ubicaciones: Ubicacion[] = [];
  ubicacionActual: Ubicacion;
  ubicacionCopia: Ubicacion;
  totalGeneral = 0;
  agregarUbicacion() {
    this.ubicaciones.push({
      id: this.ubicaciones[this.ubicaciones.length - 1].id + 1, nombre: this.ubicacion,
      equipos: []
    });
  }
  constructor() { }

  ngOnInit() {
    this.ubicaciones.push({ id: 1, nombre: 'Área 1', equipos: [] },
      { id: 2, nombre: 'Área 2', equipos: [] });
  }
  onNotificacion() {
    this.totalGeneral = 0;
    this.ubicaciones.forEach(ubicacion => {
      this.totalGeneral += isNumber(ubicacion.total) ? ubicacion.total : 0;
    });
  }


}

