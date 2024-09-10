import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLogoutComponent } from './modal-logout.component';

describe('ModalLogoutComponent', () => {
  let component: ModalLogoutComponent;
  let fixture: ComponentFixture<ModalLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLogoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
