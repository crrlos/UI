import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { MaterialesComponent } from './paginas/materiales/materiales.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { EquiposComponent } from './paginas/equipos/equipos.component';
import { PresupuestoComponent } from './paginas/presupuestos/presupuesto.component';
import { AreaComponent } from './paginas/presupuesto/area/area.component';
import { WrapperComponent } from './paginas/wrapper/wrapper.component';
import { MarcasComponent } from './paginas/marcas/marcas.component';
import { TiposComponent } from './paginas/tipos/tipos.component';
import { TecnologiaComponent } from './paginas/tecnologia/tecnologia.component';
import { GasComponent } from './paginas/gas/gas.component';
import { UnidadComponent } from './paginas/unidades/unidades.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', component: WrapperComponent, children: [
    { path: 'materiales', component: MaterialesComponent, data: { titulo: 'Materiales' } },
    { path: 'clientes', component: ClientesComponent, data: { titulo: 'Clientes' } },
    { path: 'marcas', component: MarcasComponent, data: { titulo: 'Marcas' } },
    { path: 'unidades', component: UnidadComponent, data: { titulo: 'Unidades' } },
    { path: 'tipos', component: TiposComponent, data: { titulo: 'Tipos' } },
    { path: 'tecnologias', component: TecnologiaComponent, data: { titulo: 'Tipos' } },
    { path: 'gases', component: GasComponent, data: { titulo: 'Gases' } },
    { path: 'equipos', component: EquiposComponent, data: { titulo: 'Equipos' } },
    { path: 'presupuestos', component: PresupuestoComponent, data: { titulo: 'Presupuestos' } },
    { path: 'presupuesto/:id', component: AreaComponent, data: { titulo: 'Presupuesto' } }
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutesModule { }
