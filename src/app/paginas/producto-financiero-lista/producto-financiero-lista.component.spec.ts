import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFinancieroListaComponent } from './producto-financiero-lista.component';

describe('ProductoFinancieroListaComponent', () => {
  let component: ProductoFinancieroListaComponent;
  let fixture: ComponentFixture<ProductoFinancieroListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoFinancieroListaComponent]
    });
    fixture = TestBed.createComponent(ProductoFinancieroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
