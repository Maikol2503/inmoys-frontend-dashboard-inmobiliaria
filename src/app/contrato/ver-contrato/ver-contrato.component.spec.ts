import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerContratoComponent } from './ver-contrato.component';

describe('VerContratoComponent', () => {
  let component: VerContratoComponent;
  let fixture: ComponentFixture<VerContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerContratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
