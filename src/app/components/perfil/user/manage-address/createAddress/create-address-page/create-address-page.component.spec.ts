import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddressPageComponent } from './create-address-page.component';

describe('CreateAddressPageComponent', () => {
  let component: CreateAddressPageComponent;
  let fixture: ComponentFixture<CreateAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAddressPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
