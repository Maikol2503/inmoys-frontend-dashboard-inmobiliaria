import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPublicarPropiedadComponent } from './formulario-publicar-propiedad.component';

describe('FormularioPublicarPropiedadComponent', () => {
  let component: FormularioPublicarPropiedadComponent;
  let fixture: ComponentFixture<FormularioPublicarPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPublicarPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPublicarPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
