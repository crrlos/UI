import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { ClienteHttpService } from 'src/app/servicios/http/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  constructor(private http: ClienteHttpService) { }
  cliente: Cliente;
  displayDialog = false;
  nuevoCliente = false;
  clienteSeleccionado: Cliente;

  @ViewChild('clientes_tabla') clientes_tabla: ClientesTabla;
  ngOnInit() {
  }
  showDialogToAdd() {
    this.nuevoCliente = true;
    this.cliente = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevoCliente = false;
    this.cliente = JSON.parse(JSON.stringify(event));
    console.log(this.cliente);
    this.displayDialog = true;
  }
  save(f: NgForm) {
    if (f.invalid) {
      return;
    }

    if (this.nuevoCliente) {
      this.http.guardar(this.cliente).subscribe((res) => {
        this.cliente.cliente_id = JSON.parse(JSON.stringify(res)).id;
        this.clientes_tabla.clientes.push(this.cliente);
      });
    } else {
      this.http.actualizar(this.cliente).subscribe(() => {
        const i = this.clientes_tabla.clientes.findIndex(et => et.cliente_id === this.cliente.cliente_id);
        this.clientes_tabla.clientes[i] = this.cliente;
      });
    }
    this.displayDialog = false;
  }

  delete() {
    this.displayDialog = false;
  }

}
export interface ClientesTabla {
  clientes: Cliente[];
}

