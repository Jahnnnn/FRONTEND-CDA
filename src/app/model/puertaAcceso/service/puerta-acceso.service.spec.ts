import { TestBed } from '@angular/core/testing';

import { PuertaAccesoService } from './puerta-acceso.service';

describe('PuertaAccesoService', () => {
  let service: PuertaAccesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuertaAccesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
