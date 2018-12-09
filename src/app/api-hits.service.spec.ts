import { TestBed } from '@angular/core/testing';

import { ApiHitsService } from './api-hits.service';

describe('ApiHitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiHitsService = TestBed.get(ApiHitsService);
    expect(service).toBeTruthy();
  });
});
