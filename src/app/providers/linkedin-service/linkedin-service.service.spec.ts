import { TestBed } from '@angular/core/testing';

import { LinkedinServiceService } from './linkedin-service.service';

describe('LinkedinServiceService', () => {
  let service: LinkedinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
