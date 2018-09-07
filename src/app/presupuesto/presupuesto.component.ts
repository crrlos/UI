import { Component, OnInit } from '@angular/core';
import {Ubicacion,Equipo,EquipoUbicacion} from './clases';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  equipos: Equipo[] = [];
  equipo_ubicacion: EquipoUbicacion[] = [];
  ngOnInit() {}
}
