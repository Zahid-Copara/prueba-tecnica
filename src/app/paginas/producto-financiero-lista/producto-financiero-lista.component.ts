import { Component, OnInit } from '@angular/core';
import { ProductoFinanciero } from 'src/app/modelos/producto-financiero';
import { Router } from '@angular/router';
import { ProductoFinancieroService } from 'src/app/servicios/producto-financiero.service';

@Component({
  selector: 'app-producto-financiero-lista',
  templateUrl: './producto-financiero-lista.component.html',
  styleUrls: ['./producto-financiero-lista.component.css']
})
export class ProductoFinancieroListaComponent implements OnInit {

  constructor(private router: Router, private apiService: ProductoFinancieroService) {};

  searchTerm: string = '';
  
  productoFinancieroListaRespuesta: any;
  productoFinancieroLista: ProductoFinanciero[] = [];
  productoFinancieroListaDisplay: any [] = this.productoFinancieroLista;

  pageSize: number = 1;

  pageSizeDefault: number = 5;

  ngOnInit(){
    this.apiService.getProducts().subscribe(response => {
      this.productoFinancieroListaRespuesta = response;
      this.productoFinancieroLista = this.productoFinancieroListaRespuesta.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          logo: item.logo,
          date_release: new Date(item.date_release),
          date_revision: new Date(item.date_revision)
        };
      });
      this.productoFinancieroListaDisplay = this.productoFinancieroLista.slice(0,this.pageSizeDefault);
     },
     (error) => {
      alert('Error '+error.status+': '+error.error);
     }
    );
  }

  onSelectChange(event: any){
    const valorSeleccionado = event.target.value;
    if (isNaN(valorSeleccionado)){
      return;
    }
    this.pageSize = parseInt(valorSeleccionado, 10);

    this.productoFinancieroListaDisplay = this.productoFinancieroLista.slice(0,this.pageSize);

  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    if (this.searchTerm == '') {
      this.productoFinancieroListaDisplay = this.productoFinancieroLista.slice(0,5);
    }
    else {
      this.filterData();    
    }
  }

  filterData(){
    const filteredData = this.productoFinancieroLista.filter(product => {
      return product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    this.productoFinancieroListaDisplay = filteredData;
  }

  onSelectMenuChange(event: any, item: ProductoFinanciero){
    const valorMenu = event.target.value;
    if (valorMenu === 'editar'){
      this.router.navigate(['/editarProductoFinanciero', item.id]);
    }
    if (valorMenu === 'eliminar'){
      
    }

  }

}
