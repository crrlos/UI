import { Component, OnInit, ViewChild } from '@angular/core';
import { Gas} from 'src/app/interfaces/interfaces';
import { GasHttpService } from 'src/app/servicios/http/gases.service';
import { ConfirmationService } from 'primeng/api';
declare var swal : any;
declare var $: any;
@Component({
  selector: 'app-gases',
  templateUrl: './gas.component.html'
})
export class GasComponent implements OnInit {

  constructor(
    private http: GasHttpService,
    private confirmationService: ConfirmationService
  ) {}

  invalid = false;
  gas: Gas;
  displayDialog = false;
  nuevoGas = false;
  marcaSeleccionada: Gas;

  data: Gas[] = [];

  valid : boolean = false;

  ngOnInit(): void {

    $(document).load(()=>{
      this.valid = true;
      
    });

    console.log("valid es" + this.valid);
    

    this.http.filtrar().subscribe((data) => {
      data.gases.forEach((m) => {
        this.data.push(m);
      });
    });
  }

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [{ field: "nombre", header: "Gas" }],
    http: this.http,
    data: this.data,
  };


  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(gas: Gas) {
    this.resetState(gas, false);
  }

  showDialogToDelete(gas: Gas) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(gas);
      },
    });
  }

  resetState(gas: Gas, esNuevaMarca: boolean) {
    this.invalid = false;
    this.nuevoGas = esNuevaMarca;
    this.gas = gas;
    this.displayDialog = true;
  }

  
 
  save() {
    
    if (this.gas.nombre == null || this.gas.nombre.length == 0) {
      this.invalid = true;
      return;
    }

    if (this.nuevoGas) {
      this.http.guardar(this.gas).subscribe((res) => {
        this.gas.id = JSON.parse(JSON.stringify(res)).id;
        this.data.push(this.gas);
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.gas).subscribe(() => {
        const i = this.data.findIndex((et) => et.id === this.gas.id);
        this.data[i] = this.gas;
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  delete(gas: Gas) {
    this.http.eliminar(gas.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(gas), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }
}