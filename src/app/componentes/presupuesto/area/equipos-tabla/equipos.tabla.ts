import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Equipo } from '../../../../interfaces/interfaces';
import { HttpService } from '../../../../servicios/http.service';
@Component({
  selector: 'app-equipos-tabla',
  templateUrl: './equipos.tabla.html'
})
export class EquiposTablaComponent implements OnInit {

  equipos: Equipo[];
  equipo: Equipo;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Output() equipo_seleccionado = new EventEmitter<Equipo>();

  constructor(private http: HttpService) { }
  loadLazy(event) {
    this.http.equipos(event).subscribe(data => {
      this.equipos = data.equipos;
      this.totalRecords = data.totalRecords;
    });
  }
  ngOnInit() {
    this.cols = [
      { field: 'equipo_codigo', header: 'codigo' },
      { field: 'equipo_nombre', header: 'nombre' },
      { field: 'equipo_precio', header: 'precio' },
      { field: 'capacidad', header: 'capacidad' },
      { field: 'marca', header: 'marca' },
      { field: 'tipo', header: 'tipo' },
      { field: 'voltaje', header: 'V' }
    ];
    this.selectedColumns = this.cols;
  }
  onRowSelect(event) {
    this.equipo = JSON.parse(JSON.stringify(event.data));
    this.equipo_seleccionado.emit(this.equipo);
  }
}

