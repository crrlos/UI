import { HttpClient } from '@angular/common/http';
import { MaterialEquipoArea } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialEquipoAreaHttpService {

  constructor(private http: HttpClient) { }
  agregar(material: any) {
    material.id_material = material.material.material_id;
    return this.http.post(`${HOST}/materialesequipoarea`, material);
  }
  actualizar(material: MaterialEquipoArea) {
    return this.http.put(`${HOST}/materialesequipoarea`, material);
  }
  eliminar(material: MaterialEquipoArea) {
    return this.http.delete(`${HOST}/materialesequipoarea`, { params: { id: material.material_equipo_area_id } });
  }
}
