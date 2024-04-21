import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoFinancieroListaComponent } from './paginas/producto-financiero-lista/producto-financiero-lista.component';
import { AgregarProductoFinancieroComponent } from './paginas/agregar-producto-financiero/agregar-producto-financiero.component';
import { EditarProductoFinancieroComponent } from './paginas/editar-producto-financiero/editar-producto-financiero.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/productoFinancieroLista',
    pathMatch: 'full'
  },
  {
    path: 'productoFinancieroLista',
    component: ProductoFinancieroListaComponent
  },
  {
    path: 'agregarProductoFinanciero',
    component: AgregarProductoFinancieroComponent
  },
  {
    path: 'editarProductoFinanciero/:id',
    component: EditarProductoFinancieroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
