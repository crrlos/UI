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
import { RouterModule } from '@angular/router';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MarcasComponent } from './marcas/marcas.component';
import { TiposComponent } from './tipos/tipos.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { GasComponent } from './gas/gas.component';
import { ServiciosModule } from '../servicios/servicios.module';
import { UnidadComponent } from './unidades/unidades.component';
import { CostoComponent } from './presupuesto/costo/costo.component';
import { TablaComponent } from '../tabla/tabla.component';

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
    WrapperComponent,
    MarcasComponent,
    TiposComponent,
    TecnologiaComponent,
    GasComponent,
    UnidadComponent,
    CostoComponent,
    TablaComponent
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
