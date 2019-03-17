import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Cliente } from 'src/app/interfaces/interfaces';
import { ClienteHttpService } from 'src/app/servicios/http/cliente.service';

@Component({
  selector: 'app-clientes-tabla',
  templateUrl: './clientes.tabla.component.html'
})
export class ClientesTablaComponent implements OnInit {

  constructor(private http: ClienteHttpService) { }

  clientes: Cliente[] = [];
  cliente: Cliente;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  @Input() puede_agregar: boolean;
  @Output() cliente_seleccionado = new EventEmitter<Cliente>();
  @Output() agregar = new EventEmitter<boolean>();

  ngOnInit() {
    this.cols = [
      { field: 'nombre', header: 'nombre' },
      { field: 'direccion', header: 'direccion' },
      { field: 'telefono', header: 'telefono' }
    ];
    this.selectedColumns = this.cols;
  }
  onRowSelect(event) {
    this.cliente = JSON.parse(JSON.stringify(event.data));
    this.cliente_seleccionado.emit(this.cliente);
    console.log('seleccionado');
  }
  loadLazy(event) {
    this.http.filtrar(event).subscribe(data => {
      this.clientes = data.clientes;
      this.totalRecords = data.totalRecords;
    });
  }

}
