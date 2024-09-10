import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOficinaComponent } from './card-oficina.component';

describe('CardOficinaComponent', () => {
  let component: CardOficinaComponent;
  let fixture: ComponentFixture<CardOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOficinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
