import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductoFinancieroComponent } from './editar-producto-financiero.component';

describe('EditarProductoFinancieroComponent', () => {
  let component: EditarProductoFinancieroComponent;
  let fixture: ComponentFixture<EditarProductoFinancieroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProductoFinancieroComponent]
    });
    fixture = TestBed.createComponent(EditarProductoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
