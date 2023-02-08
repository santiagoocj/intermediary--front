import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociacionesComponent } from './negociaciones.component';

describe('NegociacionesComponent', () => {
  let component: NegociacionesComponent;
  let fixture: ComponentFixture<NegociacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegociacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
