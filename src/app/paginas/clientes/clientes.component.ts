import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { ClienteHttpService } from 'src/app/servicios/http/cliente.service';
import { ConfirmationService } from 'primeng/api';
declare var swal:any;
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  constructor(
    private http: ClienteHttpService,
    private confirmationService: ConfirmationService
  ) {}

  invalid = false;
  cliente: Cliente;
  displayDialog = false;
  nuevoCliente = false;
  clienteSeleccionado: Cliente;

  data: Cliente[] = [];

  ngOnInit(): void {
    this.http.filtrar().subscribe((data) => {
      data.clientes.forEach((m) => {
        this.data.push(m);
      });
    });
  }

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [
      { field: "nombre", header: "Cliente" },
      { field: "direccion", header: "Dirección" },
      { field: "telefono", header: "Teléfono" },
    ],
    http: this.http,
    data: this.data,
  };


  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(cliente: Cliente) {
    this.resetState(cliente, false);
  }

  showDialogToDelete(cliente: Cliente) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(cliente);
      },
    });
  }

  resetState(cliente: Cliente, esNuevoCliente: boolean) {
    this.invalid = false;
    this.nuevoCliente = esNuevoCliente;
    this.cliente = cliente;
    this.displayDialog = true;
  }

  
 
  save() {
    
    if (this.cliente.nombre == null || this.cliente.nombre.length == 0) {
      this.invalid = true;
      return;
    }

    if (this.nuevoCliente) {
      this.http.guardar(this.cliente).subscribe((res) => {
        this.cliente.id = JSON.parse(JSON.stringify(res)).id;
        this.data.push(this.cliente);
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.cliente).subscribe(() => {
        const i = this.data.findIndex((et) => et.id === this.cliente.id);
        this.data[i] = this.cliente;
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(cliente: Cliente) {
    this.http.eliminar(cliente).subscribe(
      () => {
        this.data.splice(this.data.indexOf(cliente), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }
}

