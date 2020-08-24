import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente, Cotizacion } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { EquipoHttpService } from 'src/app/servicios/http/equipo.service';
import { ClienteHttpService } from 'src/app/servicios/http/cliente.service';
import { ConfirmationService } from 'primeng/api';
import { CotizacionesHttpService } from 'src/app/servicios/http/cotizaciones.service';
import { Router } from '@angular/router';

declare var swal : any;

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html'
})
export class PresupuestoComponent implements OnInit {



  constructor(
    private http: CotizacionesHttpService, 
    private clienteHttp: ClienteHttpService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

    ngOnInit() { 

      this.http.obtener().subscribe(response => {
        response.cotizaciones.forEach(c => {
          this.cotizaciones = response.cotizaciones;
          this.data.push(this.formatCotizacion(c));

        });
      });

    }

  cotizacion: Cotizacion = {};
  displayDialog = false;
  nuevaCotizacion = false;
  cotizacionSeleccionada: Cotizacion;
  results: Cliente[];

  cotizaciones: Cotizacion[] = [];
  data:any[] = [];
  invalid:boolean;

  

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [
      { field: "id", header: "Código" },
      { field: "cliente", header: "Cliente" },
      { field: "descripcion", header: "Descripción" },
    ],
    extraButtons : [
      {
        tooltip : 'Mostrar',
        clickEvent: (rowData: any) =>{
          this.router.navigate(['presupuesto', rowData.id]);
        },
        icon: 'pi-eye',
        class: 'p-button-info'
      }
    ],
    http: this.http,
    data: this.data,
  };

  formatCotizacion(cotizacion : Cotizacion){
    return {
        id : cotizacion.id,
        cliente : cotizacion.cliente.nombre,
        descripcion : cotizacion.descripcion
    };
  }

  search(event : any) {
    this.clienteHttp.clientes(event.query).subscribe((clientes: any) => {
      this.results = clientes.clientes;
    });
  }

  

  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(cotizacion: Cotizacion) {
    cotizacion = this.cotizaciones.find(c => c.id == cotizacion.id);
    this.resetState(cotizacion, false);
  }

  showDialogToDelete(cotizacion: Cotizacion) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(cotizacion);
      },
    });
  }

  resetState(cotizacion: Cotizacion, esNuevaCotizacion: boolean) {
    this.invalid = false;
    this.nuevaCotizacion = esNuevaCotizacion;
    this.cotizacion = cotizacion;
    this.displayDialog = true;
  }

  
  
  save() {

    if (this.nuevaCotizacion) {
      this.http.agregar(this.cotizacion).subscribe((res: any) => {
        this.cotizacion.id = res.id;
        this.cotizaciones.push(this.cotizacion);
        this.data.push(this.formatCotizacion(this.cotizacion));
        this.cotizacion = {};
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.cotizacion).subscribe(() => {
        const i = this.data.findIndex(c => c.id === this.cotizacion.id);
        this.data[i] = this.formatCotizacion(this.cotizacion);
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(cotizacion: Cotizacion) {
    this.http.eliminar(cotizacion.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(cotizacion), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
  }

}
