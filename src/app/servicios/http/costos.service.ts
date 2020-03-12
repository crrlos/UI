import { HttpClient } from '@angular/common/http';
import { HOST } from 'src/app/config';
import { Injectable, Host } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CostoHttpService {

  
  costos() {
   return this.http.get(`${HOST}/costohumano`);
  }

  constructor(private http: HttpClient) { }

  datos(id:number){
    return this.http.get(`${HOST}/costohumanodetalle/${id}`);
  }

  agregar(cantidad, id,pid){
    return this.http.post(`${HOST}/costohumanodetalle`,{
      cantidad, costoId : id, proyectoId : pid
    });
  }

  eliminar(id){
   return this.http.delete(`${HOST}/costohumanodetalle/${id}`); 
  }
 
}
