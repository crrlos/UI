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

    m2.unidadMedidaId = material.unidadMedida.id;
    m2.codigo = material.codigo;
    m2.nombre = material.nombre;

    return this.http.post(`${HOST}/materiales`, m2);
  }

  eliminar(id:number){
    return this.http.delete(`${HOST}/materiales/${id}`);
  }

  agregarPrecio(data : any){

    data.proveedorId = data.proveedor.id;
    data.codigoMaterial = data.codigo;
    delete data.proveedor;

    return this.http.post(`${HOST}/materiales/agregarprecio`,data);
  }
  eliminarPrecio(id : number)
  {
    return this.http.delete(`${HOST}/materiales/eliminarprecio/?id=${id}`);
  }


}
