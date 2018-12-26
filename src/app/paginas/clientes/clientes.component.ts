import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo, TipoUnidad, Marca, Tecnologia, Gas, Cliente } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  constructor(private http: HttpService) { }
  cliente: Cliente;
  displayDialog = false;
  nuevoCliente = false;
  clienteSeleccionado: Cliente;

  @ViewChild('clientes_tabla') clientes_tabla: ClientesTabla;

  voltajes;

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
  save() {

    if (this.nuevoCliente) {
      this.http.equipos_agregar(this.cliente).subscribe((res) => {
        this.cliente.cliente_id = JSON.parse(JSON.stringify(res)).id;
        this.clientes_tabla.clientes.push(this.cliente);
      });
    } else {
      this.http.equipos_actualizar(this.cliente).subscribe(() => {
        const i = this.clientes_tabla.clientes.findIndex(et => et.cliente_id === this.cliente.cliente_id);
        this.clientes_tabla.clientes[i] = this.cliente;
      });
    }
    this.displayDialog = false;
  }

  delete() {
    /* const index = this.equipos.indexOf(this.equipoSeleccionado);
    this.equipos = this.equipos.filter((val, i) => i !== index);
    this.equipo = null;
    this.displayDialog = false; */
  }

}
export interface ClientesTabla {
  clientes: Cliente[];
}

