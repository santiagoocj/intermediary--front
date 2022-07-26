import { TestBed } from '@angular/core/testing';

import { SolicitudRegistroService } from './solicitud-registro.service';

describe('SolicitudRegistroService', () => {
  let service: SolicitudRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
