import { TestBed } from '@angular/core/testing';

import { MovCaixaService } from './mov-caixa.service';

describe('MovCaixaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovCaixaService = TestBed.get(MovCaixaService);
    expect(service).toBeTruthy();
  });
});
