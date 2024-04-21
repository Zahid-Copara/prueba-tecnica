import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AgregarProductoFinancieroComponent } from './agregar-producto-financiero.component';

describe('AgregarProductoFinancieroComponent', () => {
  let component: AgregarProductoFinancieroComponent;
  let fixture: ComponentFixture<AgregarProductoFinancieroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarProductoFinancieroComponent]
    });
    fixture = TestBed.createComponent(AgregarProductoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
