import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MaterialResponse, Material } from 'src/app/interfaces/interfaces';
import { HOST } from 'src/app/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManoDeObraHttpService {

  constructor(private http: HttpClient) { }


  get() {
    return this.http.get(`${HOST}/manodeobra`);
  }

  actualizar(manoDeObra : any) {

    return this.http.put(`${HOST}/manodeobra`, manoDeObra);
  }
  agregar(manoDeObra: any) {
    
    return this.http.post(`${HOST}/manodeobra`, manoDeObra);
  }

  eliminar(id:number){
    return this.http.delete(`${HOST}/manodeobra/${id}`);
  }
}
