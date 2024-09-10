import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarPropiedadComponent } from './formulario-editar-propiedad.component';

describe('FormularioEditarPropiedadComponent', () => {
  let component: FormularioEditarPropiedadComponent;
  let fixture: ComponentFixture<FormularioEditarPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEditarPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEditarPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
