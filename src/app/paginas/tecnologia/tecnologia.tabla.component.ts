import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Tecnologia } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-tecnologias-tabla',
  templateUrl: './tecnologia.tabla.component.html'
})
export class TecnologiaTablaComponent implements OnInit {

  constructor(private http: HttpService) { }

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
      { field: 'tecnologia_nombre', header: 'tecnologia' }
    ];
    this.selectedColumns = this.cols;
    this.http.tecnologias_filtro(event).subscribe(data => {
      this.tecnologias = data.tecnologias;
      this.totalRecords = data.totalRecords;
      console.log(this.tecnologias);
    });
  }
  onRowSelect(event) {
    this.tecnologia = JSON.parse(JSON.stringify(event.data));
    this.tecnologia_seleccionado.emit(this.tecnologia);
    console.log('seleccionado');
  }

}
