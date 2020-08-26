import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterState, ActivatedRoute } from "@angular/router";
import { CostoHttpService } from "src/app/servicios/http/costos.service";
import { ManoDeObra } from 'src/app/interfaces/manoDeObra';

@Component({
  selector: "app-costo",
  templateUrl: "./costo.component.html",
})
export class CostoComponent implements OnInit {
  costos: any = [];
  costosIndividual: any = [];

  costoSeleccionado: any;
  cantidad: number;

  cotizacionId: number;

  manoDeObra: ManoDeObra = {};

  agregar() {
    this.manoDeObra.proyectoId = this.cotizacionId;
    this.http.agregar(this.manoDeObra).subscribe((r) => {
      console.log('agregado');
      
    });
  }

  constructor(private route: ActivatedRoute, private http: CostoHttpService) {
    route.params.subscribe((p) => {
      this.cargarDatos(p.id);
      this.cotizacionId = p.id;

      this.cargarCostos();
    });
  }
  eliminar(id) {
    this.http.eliminar(id).subscribe((r) => {
      this.costos.splice(
        this.costos.findIndex((c) => c.id == id),
        1
      );
    });
  }

  ngOnInit() {
    this.cargarCostos();
  }

  sumarCostos() {
    return 1;
    //return this.costos.reduce((i, j) => i + j.total, 0);
  }
  cargarDatos(id: number) {
    this.http.datos(id).subscribe((r: any) => {
      this.costos = r.detalle;
    });
  }
  cargarCostos() {
    this.http.costos(this.cotizacionId).subscribe((costos: any) => {
      this.costos = costos;
    });
  }
}
