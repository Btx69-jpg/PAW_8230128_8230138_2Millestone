import { TestBed } from '@angular/core/testing';

import { HistoricOrderService } from './historic-order.service';

describe('HistoricOrderService', () => {
  let service: HistoricOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
