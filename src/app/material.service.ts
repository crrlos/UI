import { Injectable } from '@angular/core';
import { Material } from './presupuesto/interfaces';
import { materiales } from './presupuesto/datos';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  public materiales: Material[];
  constructor() {
    this.materiales = materiales;
    console.log('creado');
  }
}
