import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente, Cotizacion } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { EquipoHttpService } from 'src/app/servicios/http/equipo.service';
import { ClienteHttpService } from 'src/app/servicios/http/cliente.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html'
})
export class PresupuestoComponent implements OnInit {

  constructor(private http: HttpService, private equipoHttp: EquipoHttpService,
    private clienteHttp: ClienteHttpService) { }
  cotizacion: Cotizacion = {};
  displayDialog = false;
  nuevaCotizacion = false;
  cotizacionSeleccionada: Cotizacion;
  results: Cliente[];

  @ViewChild('cotizaciones_tabla') cotizaciones_tabla: CotizacionTabla;

  voltajes;

  ngOnInit() { }
  search(event) {
    this.clienteHttp.clientes(event.query).subscribe((clientes: any) => {
      this.results = clientes.clientes;
    });
  }
  showDialogToAdd() {
    this.nuevaCotizacion = true;
    this.displayDialog = true;
  }
  showDialogToEdit(cotizacion: Cotizacion) {
    this.nuevaCotizacion = false;
    this.displayDialog = true;
    this.cotizacion = cotizacion;

  }
  onRowSelect(event) {
    this.nuevaCotizacion = false;
    this.cotizacion = JSON.parse(JSON.stringify(event));
    console.log(this.cotizacion);
    this.displayDialog = true;
  }
  save() {

    if (this.nuevaCotizacion) {
      this.http.cotizacion_agregar(this.cotizacion).subscribe((res: any) => {
        this.cotizacion.cotizacion_id = res.id;
        this.cotizaciones_tabla.cotizaciones.push(this.cotizacion);
        this.cotizacion = {};
      });
    } else {
      this.equipoHttp.actualizar(this.cotizacion).subscribe(() => {
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

