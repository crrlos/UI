import { Component, OnInit } from '@angular/core';
import { Material } from '../../interfaces/interfaces';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html'
})
export class MaterialesComponent implements OnInit {

  constructor() { }
  materiales: Material[];
  material: Material = {};
  Agregar() {

  }
  ngOnInit() {

  }

}
