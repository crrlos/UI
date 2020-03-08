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
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'capacidad', header: 'Capacidad (BTU)' },
      { field: 'marca', header: 'Marca' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'voltaje', header: 'Voltaje' },
      { field: 'tecnologia', header: 'Tecnología' },
      { field: 'gas', header: 'Gas' }
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
