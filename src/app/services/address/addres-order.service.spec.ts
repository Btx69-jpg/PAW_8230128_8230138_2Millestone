import { TestBed } from '@angular/core/testing';

import { AddresOrderService } from './addres-order.service';

describe('AddresOrderService', () => {
  let service: AddresOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddresOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
