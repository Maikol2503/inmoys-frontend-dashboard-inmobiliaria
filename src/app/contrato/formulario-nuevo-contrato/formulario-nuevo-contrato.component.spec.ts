import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNuevoContratoComponent } from './formulario-nuevo-contrato.component';

describe('FormularioNuevoContratoComponent', () => {
  let component: FormularioNuevoContratoComponent;
  let fixture: ComponentFixture<FormularioNuevoContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioNuevoContratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioNuevoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
