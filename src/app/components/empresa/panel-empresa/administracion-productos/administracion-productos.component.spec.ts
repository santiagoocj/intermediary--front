import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionProductosComponent } from './administracion-productos.component';

describe('AdministracionProductosComponent', () => {
  let component: AdministracionProductosComponent;
  let fixture: ComponentFixture<AdministracionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
