import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerContratosComponent } from './ver-contratos.component';

describe('VerContratosComponent', () => {
  let component: VerContratosComponent;
  let fixture: ComponentFixture<VerContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerContratosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
