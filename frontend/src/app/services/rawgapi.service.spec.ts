import { TestBed } from '@angular/core/testing';

import { RawgapiService } from './rawgapi.service';

describe('RawgapiService', () => {
  let service: RawgapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawgapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
