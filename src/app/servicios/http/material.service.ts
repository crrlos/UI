import { HttpClient } from '@angular/common/http';
import { MaterialResponse, Material } from 'src/app/interfaces/interfaces';
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
  actualizar(material : Material) {
    material.marcaId = material.marca.id;
    material.tipoId = material.tipo.id;
    material.unidadMedidaId = material.unidadMedida.id;

    return this.http.put(`${HOST}/materiales`, material);
  }
  agregar(material: Material) {
    material.marcaId = material.marca.id;
    material.tipoId = material.tipo.id;
    material.unidadMedidaId = material.unidadMedida.id;
    return this.http.post(`${HOST}/materiales`, material);
  }
}
