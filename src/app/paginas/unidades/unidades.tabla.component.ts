import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UnidadMedida } from 'src/app/interfaces/interfaces';
import { UnidadHttpService } from 'src/app/servicios/http/unidad.service';

@Component({
  selector: 'app-unidades-tabla',
  templateUrl: './unidades.tabla.component.html'
})
export class UnidadesTablaComponent implements OnInit {

  constructor(private http: UnidadHttpService) { }

  unidades: UnidadMedida[] = [];
  unidad: UnidadMedida;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() unidad_seleccionada = new EventEmitter<UnidadMedida>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'nombre', header: 'Unidad' },
      { field: 'abreviatura', header: 'Abreviatura' }
    ];
    this.selectedColumns = this.cols;
    this.http.filtrar(event).subscribe(data => {
      this.unidades = data.unidades;
      this.totalRecords = data.totalRecords;
    });
  }
  onRowSelect(event) {
    this.unidad = JSON.parse(JSON.stringify(event.data));
    this.unidad_seleccionada.emit(this.unidad);
    console.log(event);
  }

}
