import { Component, OnInit } from '@angular/core';
import { Area, Equipo } from './interfaces';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  ubicaciones: Area[] = [];
  equipos: Equipo[] = [];
  ngOnInit() { }

}
