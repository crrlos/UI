import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "src/app/config";
import { VoltajeResponse, Voltaje } from "src/app/interfaces/interfaces";
@Injectable({
  providedIn: "root",
})
export class VoltajesHttpService {
  constructor(private http: HttpClient) {}

  guardar(voltaje: Voltaje) {
    return this.http.post(`${HOST}/voltajes`, voltaje);
  }
  actualizar(voltaje: Voltaje) {
    return this.http.put(`${HOST}/voltajes`, voltaje);
  }
  eliminar(id: number) {
    return this.http.delete(`${HOST}/voltajes/${id}`);
  }
  filtrar(event?) {
    return this.http.get<VoltajeResponse>(`${HOST}/voltajes`, {
      params: event,
    });
  }
}
