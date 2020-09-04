import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MaterialResponse, Material } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialHttpService {

  constructor(private http: HttpClient) { }
  materiales(event?: any) {
    return this.http.get<MaterialResponse>(`${HOST}/materiales`, {
      params: event,
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })

    });
  }
  actualizar(material : any) {
   
    material.unidadMedidaId = material.unidadMedida.id;

    return this.http.put(`${HOST}/materiales`, material);
  }
  agregar(material: Material) {
    
    let m2: any = {};

    //m2.marcaId = material.marca.id;
    //m2.tipoId = material.tipo.id;
    m2.unidadMedidaId = material.unidadMedida.id;
    m2.codigo = material.codigo;
    m2.nombre = material.nombre;
    //m2.precio = material.precio * 1;

    return this.http.post(`${HOST}/materiales`, m2);
  }

  eliminar(id:number){
    return this.http.delete(`${HOST}/materiales/${id}`);
  }
}
