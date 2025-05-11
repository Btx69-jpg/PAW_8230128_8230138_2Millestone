import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosAddressComponent } from './dados-address.component';

describe('DadosAddressComponent', () => {
  let component: DadosAddressComponent;
  let fixture: ComponentFixture<DadosAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
