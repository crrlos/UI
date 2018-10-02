import { Component, OnInit } from '@angular/core';
import { Ubicacion, Equipo, EquipoUbicacion } from './interfaces';
import {MatTreeModule} from '@angular/material/tree';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  equipos: Equipo[] = [];
  equipo_ubicacion: EquipoUbicacion[] = [];
  ngOnInit() { }
  toggle(div) {
    const x = document.getElementById('r_' + div);
    const y = document.getElementById('r1_' + div);
    if (x.style.display === 'none') {
      x.style.display = 'block';
      y.classList.remove('mif-plus');
      y.classList.add('mif-minus');
    } else {
      x.style.display = 'none';
      y.classList.remove('mif-minus');
      y.classList.add('mif-plus');
    }

  }
}
