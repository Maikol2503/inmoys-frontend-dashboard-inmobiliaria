import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarDetallesViviendaComponent } from './form-editar-detalles-vivienda.component';

describe('FormEditarDetallesViviendaComponent', () => {
  let component: FormEditarDetallesViviendaComponent;
  let fixture: ComponentFixture<FormEditarDetallesViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditarDetallesViviendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarDetallesViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
