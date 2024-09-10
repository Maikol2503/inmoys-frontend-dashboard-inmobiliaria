import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViviendaComponent } from './form-vivienda.component';

describe('FormViviendaComponent', () => {
  let component: FormViviendaComponent;
  let fixture: ComponentFixture<FormViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViviendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
