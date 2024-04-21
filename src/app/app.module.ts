import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoFinancieroListaComponent } from './paginas/producto-financiero-lista/producto-financiero-lista.component';
import { AgregarProductoFinancieroComponent } from './paginas/agregar-producto-financiero/agregar-producto-financiero.component';
import { FormsModule } from '@angular/forms';
import { EditarProductoFinancieroComponent } from './paginas/editar-producto-financiero/editar-producto-financiero.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductoFinancieroListaComponent,
    AgregarProductoFinancieroComponent,
    EditarProductoFinancieroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
