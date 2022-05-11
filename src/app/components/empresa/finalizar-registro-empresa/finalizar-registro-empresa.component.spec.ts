import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarRegistroEmpresaComponent } from './finalizar-registro-empresa.component';

describe('FinalizarRegistroEmpresaComponent', () => {
  let component: FinalizarRegistroEmpresaComponent;
  let fixture: ComponentFixture<FinalizarRegistroEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizarRegistroEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarRegistroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
