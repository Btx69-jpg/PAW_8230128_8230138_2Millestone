import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment-service.service';

describe('CommentServiceService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
