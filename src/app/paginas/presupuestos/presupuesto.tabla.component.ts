import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Equipo, Cotizacion } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { Router } from '@angular/router';
import { EditableColumn } from 'primeng/table';
import {HOST} from 'src/app/config';

@Component({
  selector: 'app-presupuesto-tabla',
  templateUrl: './presupuesto.tabla.component.html'
})
export class PresupuestoTablaComponent implements OnInit {
  variable = "hola";
  constructor(private http: HttpService, private router: Router) { }

  cotizaciones: Cotizacion[] = [];
  cotizacion: Cotizacion;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() cotizacion_seleccionada = new EventEmitter<Cotizacion>();
  @Output() agregar = new EventEmitter<boolean>();
  @Output() editar = new EventEmitter<Cotizacion>();


  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Id', width: '5%' },
      { field: 'cliente', header: 'Cliente', width: '40%' },
      { field: 'descripcion', header: 'Descripción', width: '40%' },
      { field: 'opciones', header: 'Opciones', width: '15%' }
    ];
    this.selectedColumns = this.cols;
  }
  selectedCotizacion(data) {
    this.editar.emit(data);
  }
  onRowSelect(event) {
    this.router.navigate(['presupuesto', event.data.id]);
  }
  loadLazy(event: Lazy) {
    console.log(event);

    this.http.cotizaciones(event).subscribe(data => {
      this.cotizaciones = data.cotizaciones;
      this.totalRecords = data.totalRecords;
    });
  }

}
interface Lazy {
  first?;
  rows?;
  softField?;
  globalFilter?;
}
