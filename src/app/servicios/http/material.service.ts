import { HttpClient } from '@angular/common/http';
import { MaterialResponse } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialHttpService {

  constructor(private http: HttpClient) { }
  materiales(event?) {
    return this.http.get<MaterialResponse>(`${HOST}/materiales`, {
      params: event
    });
  }
  actualizar(material) {
    material.id_marca = material.marca.marca_id;
    material.id_tipo = material.tipo.tipo_id;
    material.id_unidad_medida = material.unidad_medida.unidad_medida_id;

    return this.http.put(`${HOST}/materiales`, material);
  }
  agregar(material) {
    material.id_marca = material.marca.marca_id;
    material.id_tipo = material.tipo.tipo_id;
    material.id_unidad_medida = material.unidad_medida.unidad_medida_id;
    return this.http.post(`${HOST}/materiales`, material);
  }
}
