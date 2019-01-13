import { Component, OnInit, ViewChild } from '@angular/core';
import { Gas} from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-gases',
  templateUrl: './gas.component.html'
})
export class GasComponent implements OnInit {

  constructor(private http: HttpService) { }
  gas: Gas;
  displayDialog = false;
  nuevogas = false;
  gasSeleccionado: Gas;

  @ViewChild('gas_tabla') gas_tabla: GasTabla;

  ngOnInit() {
  }
  showDialogToAdd() {
    this.nuevogas = true;
    this.gas = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevogas = false;
    this.gas = JSON.parse(JSON.stringify(event));
    this.displayDialog = true;
  }
  save() {

    if (this.nuevogas) {
      this.http.gases_guardar(this.gas).subscribe((res) => {
        this.gas.gas_id = JSON.parse(JSON.stringify(res)).id;
        this.gas_tabla.gases.push(this.gas);
      });
    } else {
      this.http.gases_actualizar(this.gas).subscribe(() => {
        const i = this.gas_tabla.gases.findIndex(et => et.gas_id === this.gas.gas_id);
        this.gas_tabla.gases[i] = this.gas;
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
export interface GasTabla {
  gases: Gas[];
}

