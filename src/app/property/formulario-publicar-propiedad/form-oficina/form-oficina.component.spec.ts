import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOficinaComponent } from './form-oficina.component';

describe('FormOficinaComponent', () => {
  let component: FormOficinaComponent;
  let fixture: ComponentFixture<FormOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOficinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
