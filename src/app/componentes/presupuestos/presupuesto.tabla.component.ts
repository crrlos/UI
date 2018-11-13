import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Equipo, Cotizacion } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-presupuesto-tabla',
  templateUrl: './presupuesto.tabla.component.html'
})
export class PresupuestoTablaComponent implements OnInit {

  constructor(private http: HttpService) { }

  cotizaciones: Cotizacion[] = [];
  cotizacion: Cotizacion;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() cotizacion_seleccionada = new EventEmitter<Cotizacion>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'cliente', header: 'Cliente' },
      { field: 'descripcion', header: 'Descripción' }
    ];
    this.selectedColumns = this.cols;
  }
  onRowSelect(event) {
    this.cotizacion = JSON.parse(JSON.stringify(event.data));
    this.cotizacion_seleccionada.emit(this.cotizacion);
  }
  loadLazy(event) {
    this.http.cotizaciones(event).subscribe(data => {
      this.cotizaciones = data.cotizaciones;
      this.totalRecords = data.totalRecords;
    });
  }

}
