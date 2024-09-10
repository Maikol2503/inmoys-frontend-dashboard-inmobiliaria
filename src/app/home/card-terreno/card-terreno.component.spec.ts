import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTerrenoComponent } from './card-terreno.component';

describe('CardTerrenoComponent', () => {
  let component: CardTerrenoComponent;
  let fixture: ComponentFixture<CardTerrenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTerrenoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTerrenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
