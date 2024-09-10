import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardViviendaComponent } from './card-vivienda.component';

describe('CardViviendaComponent', () => {
  let component: CardViviendaComponent;
  let fixture: ComponentFixture<CardViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardViviendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
