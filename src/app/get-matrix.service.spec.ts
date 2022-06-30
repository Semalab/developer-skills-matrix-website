import { TestBed } from '@angular/core/testing';

import { GetMatrixService } from './get-matrix.service';

describe('GetMatrixService', () => {
  let service: GetMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
