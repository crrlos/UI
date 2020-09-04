import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesComponent } from './materiales/materiales.component';
import { EquiposComponent } from './equipos/equipos.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
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
import { TablaComponent } from '../tabla/tabla.component';
import { VoltajesComponent } from './voltajes/voltajes.component';

@NgModule({
  declarations: [
    MaterialesComponent,
    EquiposComponent,
    CotizacionesComponent,
    ClientesComponent,
    WrapperComponent,
    MarcasComponent,
    TiposComponent,
    TecnologiaComponent,
    GasComponent,
    UnidadComponent,
    TablaComponent,
    VoltajesComponent
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
