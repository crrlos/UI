import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Marca } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-marcas-tabla',
  templateUrl: './marcas.tabla.component.html'
})
export class MarcasTablaComponent implements OnInit {

  constructor(private http: HttpService) { }

  marcas: Marca[] = [];
  marca: Marca;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() marca_seleccionada = new EventEmitter<Marca>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'marca_nombre', header: 'marca' }
    ];
    this.selectedColumns = this.cols;
    this.http.marcas_filtro(event).subscribe(data => {
      this.marcas = data.marcas;
      this.totalRecords = data.totalRecords;
      console.log(this.marcas);
    });
  }
  onRowSelect(event) {
    this.marca = JSON.parse(JSON.stringify(event.data));
    this.marca_seleccionada.emit(this.marca);
    console.log('seleccionado');
  }

}
