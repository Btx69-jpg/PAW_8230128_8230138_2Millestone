import { TestBed } from '@angular/core/testing';

import { JwtInterceprotServiceService } from './jwt-interceprot-service.service';

describe('JwtInterceprotServiceService', () => {
  let service: JwtInterceprotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInterceprotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
