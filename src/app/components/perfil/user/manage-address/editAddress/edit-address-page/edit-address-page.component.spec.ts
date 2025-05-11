import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressPageComponent } from './edit-address-page.component';

describe('EditAddressPageComponent', () => {
  let component: EditAddressPageComponent;
  let fixture: ComponentFixture<EditAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddressPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
