import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoFinanciero } from 'src/app/modelos/producto-financiero';
import { ProductoFinancieroService } from 'src/app/servicios/producto-financiero.service';

@Component({
  selector: 'app-agregar-producto-financiero',
  templateUrl: './agregar-producto-financiero.component.html',
  styleUrls: ['./agregar-producto-financiero.component.css']
})

export class AgregarProductoFinancieroComponent implements OnInit{

  constructor(private router: Router, private apiService: ProductoFinancieroService) {};

  id: string = '';
  nombre: string = '';
  descripcion: string = '';
  logo: string = '';
  fechaLiberacion: string = '';
  fechaRevision: string = '';
  idList: string[]=[];

  productoFinancieroListaRespuesta: any;
  productoFinancieroLista: ProductoFinanciero[] = [];

  esValido: boolean = true;

  idErrorState: boolean = false;
  idErrorMessage: string = '';

  nameErrorState: boolean = false;
  nameErrorMessage: string = '';

  descriptionErrorState: boolean = false;
  descriptionErrorMessage: string = '';

  logoErrorState: boolean = false;
  logoErrorMessage: string = '';

  fechaLiberacionErrorState: boolean = false;
  fechaLiberacionErrorMessage: string = '';

  fechaValidacionErrorState: boolean = false;
  fechaValidacionErrorMessage: string = '';

  ngOnInit(): void {
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
      this.idList = this.productoFinancieroLista.map(objeto => objeto.id);
     },
     (error) => {
      alert('Error '+error.status+': '+error.error);
     }
    );
  }

  obtenerFecha(fechaString: string): Date {
    const partes = fechaString.split('-');
    const year = parseInt(partes[0], 10);
    const month = parseInt(partes[1], 10) - 1;
    const day = parseInt(partes[2], 10);
    return new Date(year,month,day);
  }

  onSend() {
    this.validarTodo();
    if (this.esValido){
      const fechaLiberacionFormat = this.obtenerFecha(this.fechaLiberacion);
      const fechaRevisionFormat = this.obtenerFecha(this.fechaRevision);
      let productoFinanciero: ProductoFinanciero;
      productoFinanciero = {
        id: this.id,
        name: this.nombre,
        description: this.descripcion,
        logo: this.logo,
        date_release: fechaLiberacionFormat,
        date_revision: fechaRevisionFormat
      };
      this.apiService.postProduct(productoFinanciero).subscribe(
        (response) => {
          alert("Registro ingresado correctamente!");
          this.router.navigate(['/productoFinancieroLista']);
        },
        (error) => {
          alert('Error '+error.status+': '+error.error);
        }
      );

    }
  }

  onRestart() {
    this.id = '';
    this.nombre = '';
    this.descripcion = '';
    this.logo = '';
    this.fechaLiberacion = '';
    this.fechaRevision = '';
    this.idErrorState = false;
    this.nameErrorState = false;
    this.descriptionErrorState = false;
    this.logoErrorState = false;
    this.fechaLiberacionErrorState = false;
  }

  actualizarFechaRevision() : void {
    let fechaActual = new Date();
    fechaActual.setHours(0,0,0,0);
    if (this.fechaLiberacion) {
      const fechaLiberacion = this.obtenerFecha(this.fechaLiberacion);

      if (fechaLiberacion >= fechaActual){
        fechaLiberacion.setFullYear(fechaLiberacion.getFullYear()+1);
        this.fechaRevision = fechaLiberacion.toISOString().slice(0,10);
        this.fechaLiberacionErrorMessage = '';
        this.fechaLiberacionErrorState = false;
      }
      else {
        this.fechaLiberacionErrorState = true;
        this.fechaLiberacionErrorMessage = 'Fecha de liberación inválida!';
        this.fechaLiberacion = '';
      }
    }
    else {
      this.fechaRevision = '';
    }
  }

  idValidate() {
    const idInput = this.id;
    if (this.idList.includes(idInput)){
      this.idErrorState = true;
      this.idErrorMessage = 'ID no válido!';
      return;
    }
    if (idInput === '' || idInput === null || idInput === undefined) {
      this.idErrorState = true;
      this.idErrorMessage = 'Este campo es requerido!';
    }
    else {
      if (idInput.length >= 3 && idInput.length <= 10) {
        this.idErrorState = false;
        this.idErrorMessage = '';
      }
      else {
        this.idErrorState = true;
        this.idErrorMessage = 'ID no válido!';
      }
    }
  }

  nameValidate(){
    const nameInput = this.nombre;
    if (nameInput === '' || nameInput === null || nameInput === undefined) {
      this.nameErrorState = true;
      this.nameErrorMessage = 'Este campo es requerido!';
    }
    else {
      if (nameInput.length >= 5 && nameInput.length <= 100) {
        this.nameErrorState = false;
        this.nameErrorMessage = '';
      }
      else {
        this.nameErrorState = true;
        this.nameErrorMessage = 'Nombre no válido!';
      }
    }
  }

  descriptionValidate() {
    const descriptionInput = this.descripcion;
    if (descriptionInput === '' || descriptionInput === null || descriptionInput === undefined) {
      this.descriptionErrorState = true;
      this.descriptionErrorMessage = 'Este campo es requerido!';
    }
    else {
      if (descriptionInput.length >= 10 && descriptionInput.length <= 200) {
        this.descriptionErrorState = false;
        this.descriptionErrorMessage = '';
      }
      else {
        this.descriptionErrorState = true;
        this.descriptionErrorMessage = 'Descripción no válido!';
      }
    }
  }

  logoValidate() {
    const logoInput = this.logo;
    if (logoInput === '' || logoInput === null || logoInput === undefined) {
      this.logoErrorState = true;
      this.logoErrorMessage = 'Este campo es requerido!';
    }
    else {
      this.logoErrorState = false;
      this.logoErrorMessage = '';
    }
  }

  fechaLiberacionValidate() {
    let fechaActual = new Date();
    fechaActual.setHours(0,0,0,0);
    const fechaLiberacionInput = this.fechaLiberacion;
    if (fechaLiberacionInput === '' || fechaLiberacionInput === null || fechaLiberacionInput === undefined) {
      this.fechaLiberacionErrorState = true;
      this.fechaLiberacionErrorMessage = 'Este campo es requerido!';
    }
    else {
      const fechaLiberacionFormat = this.obtenerFecha(fechaLiberacionInput);
      if (fechaLiberacionFormat >= fechaActual) {
        this.fechaLiberacionErrorState = false;
        this.fechaLiberacionErrorMessage = '';
        this.fechaLiberacion = fechaLiberacionInput;
      }
      else {
        this.fechaLiberacionErrorState = true;
        this.fechaLiberacionErrorMessage = 'Fecha de liberación inválida!';
        this.fechaLiberacion = '';
      }
    }
  }

  validarTodo() {
    this.idValidate();
    this.nameValidate();
    this.descriptionValidate();
    this.logoValidate();
    this.fechaLiberacionValidate();

    this.esValido = true;
    if (this.idErrorState || this.nameErrorState || this.descriptionErrorState || 
      this.descriptionErrorState || this.logoErrorState || this.fechaLiberacionErrorState) {
        this.esValido = false;
    }
  }

  idBlur(event: any){
    this.idValidate();
  }

  nameBlur(event: any) {
    this.nameValidate();
  }

  descriptionBlur(event: any) {
    this.descriptionValidate();
  }

  logoBlur(event: any) {
    this.logoValidate();
  }
}
