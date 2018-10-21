import { Component, OnInit } from '@angular/core';
import { Material } from '../../interfaces/interfaces';
import { materiales } from '../../datos';
import { MaterialService } from '../../material.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html'
})
export class MaterialesComponent implements OnInit {

  constructor(private m: MaterialService) { }
  materiales: Material[];
  material: Material = {};
  Agregar() {
    this.m.materiales.push(this.material);
  }
  ngOnInit() {
    this.materiales = this.m.materiales;
  }

}
