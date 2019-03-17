import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Gas } from 'src/app/interfaces/interfaces';
import { GasHttpService } from 'src/app/servicios/http/gases.service';

@Component({
  selector: 'app-gas-tabla',
  templateUrl: './gas.tabla.component.html'
})
export class GasTablaComponent implements OnInit {

  constructor(private http: GasHttpService) { }

  gases: Gas[] = [];
  gas: Gas;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() gas_seleccionado = new EventEmitter<Gas>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'gas_nombre', header: 'gas' }
    ];
    this.selectedColumns = this.cols;
    this.http.filtrar(event).subscribe(data => {
      this.gases = data.gases;
      this.totalRecords = data.totalRecords;
    });
  }
  onRowSelect(event) {
    this.gas = JSON.parse(JSON.stringify(event.data));
    this.gas_seleccionado.emit(this.gas);
    console.log('seleccionado');
  }

}
