import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Equipo } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-presupuesto-tabla',
  templateUrl: './presupuesto.tabla.component.html'
})
export class PresupuestoTablaComponent implements OnInit {

  constructor(private http: HttpService) { }

  equipos: Equipo[] = [];
  equipo: Equipo;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() equipo_seleccionado = new EventEmitter<Equipo>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'equipo_codigo', header: 'Cliente' },
      { field: 'equipo_nombre', header: 'Fecha' },
      { field: 'equipo_precio', header: 'Estado' }
    ];
    this.selectedColumns = this.cols;
  }
  onRowSelect(event) {
    this.equipo = JSON.parse(JSON.stringify(event.data));
    this.equipo_seleccionado.emit(this.equipo);
  }
  loadLazy(event) {
    this.http.equipos(event).subscribe(data => {
      this.equipos = data.equipos;
      this.totalRecords = data.totalRecords;
    });
  }

}
