import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Equipo, Cotizacion } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presupuesto-tabla',
  templateUrl: './presupuesto.tabla.component.html'
})
export class PresupuestoTablaComponent implements OnInit {

  constructor(private http: HttpService, private router: Router) { }

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
      { field: 'cliente', header: 'Cliente', width: '45%' },
      { field: 'descripcion', header: 'Descripción', width: '45%' },
      { field: 'editar', header: 'Editar', width: '10%' }
    ];
    this.selectedColumns = this.cols;
  }
  selectedCotizacion(data) {
    console.log('un evento');
  }
  onRowSelect(event) {
    this.router.navigate(['presupuesto', event.data.cotizacion_id]);
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
