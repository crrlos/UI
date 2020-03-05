import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Tecnologia } from 'src/app/interfaces/interfaces';
import { TecnologiaHttpService } from 'src/app/servicios/http/tecnologias.service';

@Component({
  selector: 'app-tecnologias-tabla',
  templateUrl: './tecnologia.tabla.component.html'
})
export class TecnologiaTablaComponent implements OnInit {

  constructor(private http: TecnologiaHttpService) { }

  tecnologias: Tecnologia[] = [];
  tecnologia: Tecnologia;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() tecnologia_seleccionado = new EventEmitter<Tecnologia>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'nombre', header: 'Tecnologia' }
    ];
    this.selectedColumns = this.cols;
    this.http.filtrar(event).subscribe(data => {
      this.tecnologias = data.tecnologias;
      this.totalRecords = data.totalRecords;
    });
  }
  onRowSelect(event) {
    this.tecnologia = JSON.parse(JSON.stringify(event.data));
    this.tecnologia_seleccionado.emit(this.tecnologia);
    console.log('seleccionado');
  }

}
