import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListaComponent } from './ordes-lista.component';

describe('OrdersListaComponent', () => {
  let component: OrdersListaComponent;
  let fixture: ComponentFixture<OrdersListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
