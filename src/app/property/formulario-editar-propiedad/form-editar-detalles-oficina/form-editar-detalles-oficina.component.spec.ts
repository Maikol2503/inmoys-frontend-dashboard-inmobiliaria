import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarDetallesOficinaComponent } from './form-editar-detalles-oficina.component';

describe('FormEditarDetallesOficinaComponent', () => {
  let component: FormEditarDetallesOficinaComponent;
  let fixture: ComponentFixture<FormEditarDetallesOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditarDetallesOficinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarDetallesOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
