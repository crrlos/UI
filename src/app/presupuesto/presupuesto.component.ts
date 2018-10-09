import { Component, OnInit } from '@angular/core';
import { Ubicacion, Equipo } from './interfaces';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  equipos: Equipo[] = [];
  ngOnInit() { }

}
