import { TestBed } from '@angular/core/testing';

import { VigenciaService } from './vigencia.service';

describe('VigenciaService', () => {
  let service: VigenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
