import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipoChildComponent } from './presupuesto/equipo-child/equipo-child.component';
import { AreaComponent } from './presupuesto/area/area.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EquiposTablaComponent } from './equipos/equipos.tabla.component';
import { MaterialesTablaComponent } from './materiales/materiales.tabla.component';
import { PresupuestoTablaComponent } from './presupuestos/presupuesto.tabla.component';
import { PresupuestoComponent } from './presupuestos/presupuesto.component';
import { PrimengModule } from './primeng.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesTablaComponent } from './clientes/clientes.tabla.component';
import { RouterModule } from '@angular/router';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MarcasComponent } from './marcas/marcas.component';
import { MarcasTablaComponent } from './marcas/marcas.tabla.component';
import { TiposComponent } from './tipos/tipos.component';
import { TiposTablaComponent } from './tipos/tipos.tabla.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { GasComponent } from './gas/gas.component';
import { TecnologiaTablaComponent } from './tecnologia/tecnologia.tabla.component';
import { GasTablaComponent } from './gas/gas.tabla.component';
import { ServiciosModule } from '../servicios/servicios.module';
import { UnidadComponent } from './unidades/unidades.component';
import { UnidadesTablaComponent } from './unidades/unidades.tabla.component';
import { CostoComponent } from './presupuesto/costo/costo.component';

@NgModule({
  declarations: [
    EquipoChildComponent,
    AreaComponent,
    MaterialesComponent,
    EquiposComponent,
    EquiposTablaComponent,
    MaterialesTablaComponent,
    PresupuestoTablaComponent,
    PresupuestoComponent,
    ClientesComponent,
    ClientesTablaComponent,
    WrapperComponent,
    MarcasComponent,
    MarcasTablaComponent,
    TiposComponent,
    TiposTablaComponent,
    TecnologiaComponent,
    TecnologiaTablaComponent,
    GasComponent,
    GasTablaComponent,
    UnidadComponent,
    UnidadesTablaComponent,
    CostoComponent
  ],
  imports: [
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    PrimengModule,
    RouterModule,
    ServiciosModule
  ],
  exports: [
    SharedModule
  ]
})
export class PaginasModule { }
