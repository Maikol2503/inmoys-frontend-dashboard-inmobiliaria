import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleBrowserComponent } from './inmueble-browser.component';

describe('InmuebleBrowserComponent', () => {
  let component: InmuebleBrowserComponent;
  let fixture: ComponentFixture<InmuebleBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmuebleBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
