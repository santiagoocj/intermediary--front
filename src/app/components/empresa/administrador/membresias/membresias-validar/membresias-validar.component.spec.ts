import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiasValidarComponent } from './membresias-validar.component';

describe('MembresiasValidarComponent', () => {
  let component: MembresiasValidarComponent;
  let fixture: ComponentFixture<MembresiasValidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembresiasValidarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembresiasValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
