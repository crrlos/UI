import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Equipo } from 'src/app/interfaces/interfaces';
import { EquipoHttpService } from 'src/app/servicios/http/equipo.service';

@Component({
  selector: 'app-equipos-tabla',
  templateUrl: './equipos.tabla.component.html'
})
export class EquiposTablaComponent implements OnInit {

  constructor(private http: EquipoHttpService) { }

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
      { field: 'equipo_codigo', header: 'código' },
      { field: 'equipo_nombre', header: 'nombre' },
      { field: 'equipo_precio', header: 'precio' },
      { field: 'capacidad', header: 'capacidad (BTU)' },
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
