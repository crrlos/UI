import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TipoUnidad as Tipo } from 'src/app/interfaces/interfaces';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';

@Component({
  selector: 'app-tipos-tabla',
  templateUrl: './tipos.tabla.component.html'
})
export class TiposTablaComponent implements OnInit {

  constructor(private http: TiposHttpService) { }

  tipos: Tipo[] = [];
  tipo: Tipo;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() tipo_seleccionado = new EventEmitter<Tipo>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'nombre', header: 'Tipo' }
    ];
    this.selectedColumns = this.cols;
    this.http.filtrar(event).subscribe(data => {
      this.tipos = data.tipos;
      this.totalRecords = data.totalRecords;
    });
  }
  onRowSelect(event) {
    this.tipo = JSON.parse(JSON.stringify(event.data));
    this.tipo_seleccionado.emit(this.tipo);
  }

}
