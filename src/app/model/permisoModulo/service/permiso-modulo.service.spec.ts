import { TestBed } from '@angular/core/testing';

import { PermisoModuloService } from './permiso-modulo.service';

describe('PermisoModuloService', () => {
  let service: PermisoModuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoModuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
