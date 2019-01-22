import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TipoUnidad as Tipo } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-tipos-tabla',
  templateUrl: './tipos.tabla.component.html'
})
export class TiposTablaComponent implements OnInit {

  constructor(private http: HttpService) { }

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
      { field: 'tipo_nombre', header: 'tipo' }
    ];
    this.selectedColumns = this.cols;
    this.http.tipos_filtro(event).subscribe(data => {
      this.tipos = data.tipos;
      this.totalRecords = data.totalRecords;
      console.log(this.tipos);
    });
  }
  onRowSelect(event) {
    this.tipo = JSON.parse(JSON.stringify(event.data));
    this.tipo_seleccionado.emit(this.tipo);
    console.log('seleccionado');
  }

}
