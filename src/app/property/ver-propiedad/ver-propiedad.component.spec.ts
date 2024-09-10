import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPropiedadComponent } from './ver-propiedad.component';

describe('VerPropiedadComponent', () => {
  let component: VerPropiedadComponent;
  let fixture: ComponentFixture<VerPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
