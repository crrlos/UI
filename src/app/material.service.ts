import { Injectable } from '@angular/core';
import { Material } from './interfaces/interfaces';
import { materiales } from './datos';

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
