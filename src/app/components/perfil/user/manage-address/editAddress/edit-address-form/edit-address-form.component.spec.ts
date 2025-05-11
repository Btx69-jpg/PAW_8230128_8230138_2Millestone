import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressFormComponent } from './edit-address-form.component';

describe('EditAddressFormComponent', () => {
  let component: EditAddressFormComponent;
  let fixture: ComponentFixture<EditAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddressFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
