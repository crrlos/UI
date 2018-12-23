import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente, Cotizacion } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html'
})
export class PresupuestoComponent implements OnInit {

  constructor(private http: HttpService) { }
  cotizacion: Cotizacion = {};
  displayDialog = false;
  nuevaCotizacion = false;
  cotizacionSeleccionada: Cotizacion;
  results: Cliente[];

  @ViewChild('cotizaciones_tabla') cotizaciones_tabla: CotizacionTabla;

  voltajes;

  ngOnInit() {}
  search(event) {
    this.http.clientes(event.query).subscribe(clientes => {
      this.results = clientes;
    });
  }
  showDialogToAdd() {
    this.nuevaCotizacion = true;
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevaCotizacion = false;
    this.cotizacion = JSON.parse(JSON.stringify(event));
    console.log(this.cotizacion);
    this.displayDialog = true;
  }
  save() {

    if (this.nuevaCotizacion) {
      this.http.cotizacion_agregar(this.cotizacion).subscribe((res) => {
        this.cotizacion.cotizacion_id = JSON.parse(JSON.stringify(res)).id;
        this.cotizaciones_tabla.cotizaciones.push(this.cotizacion);
        this.cotizacion = {};
      });
    } else {
      this.http.equipos_actualizar(this.cotizacion).subscribe(() => {
        // const i = this.equipos_tabla.equipos.findIndex(et => et.equipo_id === this.cotizacion.equipo_id);
         // this.equipos_tabla.equipos[i] = this.cotizacion;
      });
    }
    this.displayDialog = false;
  }

  delete() {
    /* const index = this.equipos.indexOf(this.equipoSeleccionado);
    this.equipos = this.equipos.filter((val, i) => i !== index);
    this.equipo = null;
    this.displayDialog = false; */
  }

}
export interface CotizacionTabla {
  cotizaciones: Cotizacion[];
}

