import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRegistroComponent } from './solicitud-registro.component';

describe('SolicitudRegistroComponent', () => {
  let component: SolicitudRegistroComponent;
  let fixture: ComponentFixture<SolicitudRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
