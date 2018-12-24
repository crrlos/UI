import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Equipo } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-equipos-tabla',
  templateUrl: './equipos.tabla.component.html'
})
export class EquiposTablaComponent implements OnInit {

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
      { field: 'equipo_codigo', header: 'codigo' },
      { field: 'equipo_nombre', header: 'nombre' },
      { field: 'equipo_precio', header: 'precio' },
      { field: 'capacidad', header: 'capacidad' },
      { field: 'marca', header: 'marca' },
      { field: 'tipo', header: 'tipo' },
      { field: 'voltaje', header: 'V' },
      { field: 'tecnologia', header: 'tecnología' },
      { field: 'gas', header: 'gas' }
    ];
    this.selectedColumns = this.cols;
  }
  onRowSelect(event) {
    this.equipo = JSON.parse(JSON.stringify(event.data));
    this.equipo_seleccionado.emit(this.equipo);
    console.log('seleccionado');
  }
  loadLazy(event) {
    this.http.equipos(event).subscribe(data => {
      this.equipos = data.equipos;
      this.totalRecords = data.totalRecords;
    });
  }

}
