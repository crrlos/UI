import { Component, OnInit } from '@angular/core';
import {Ubicacion} from './clases';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  ngOnInit() {
    this.ubicaciones.push({ codigo: 1, nombre: "Ubicacion 1", isEditable: false });
  }
}
