import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PaginasModule } from './paginas/paginas.module';
import { RoutesModule } from './routes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PaginasModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
