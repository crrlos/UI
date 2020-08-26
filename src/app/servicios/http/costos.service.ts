import { HttpClient } from "@angular/common/http";
import { HOST } from "src/app/config";
import { Injectable, Host } from "@angular/core";
import {ManoDeObra} from 'src/app/interfaces/manoDeObra';

@Injectable({
  providedIn: "root",
})
export class CostoHttpService {
  private  PATH : string = 'manodeobra';
  costos(id : number) {
    return this.http.get(`${HOST}/${this.PATH}/${id}`);
  }

  constructor(private http: HttpClient) {}

  datos(id: number) {
    return this.http.get(`${HOST}/${this.PATH}/${id}`);
  }

  agregar(manoDeObra : ManoDeObra) {
    return this.http.post(`${HOST}/${this.PATH}`, manoDeObra);
  }

  eliminar(id : number) {
    return this.http.delete(`${HOST}/${this.PATH}/${id}`);
  }
}
