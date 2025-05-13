import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHistoricOrderComponent } from './lista-historic-order.component';

describe('ListaHistoricOrderComponent', () => {
  let component: ListaHistoricOrderComponent;
  let fixture: ComponentFixture<ListaHistoricOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHistoricOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaHistoricOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
