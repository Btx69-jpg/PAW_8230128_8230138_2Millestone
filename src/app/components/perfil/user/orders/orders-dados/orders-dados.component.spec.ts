import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDadosComponent } from './orders-dados.component';

describe('OrdersDadosComponent', () => {
  let component: OrdersDadosComponent;
  let fixture: ComponentFixture<OrdersDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
