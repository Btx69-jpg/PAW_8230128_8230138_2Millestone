import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdesPageComponent } from './ordes-page.component';

describe('OrdesPageComponent', () => {
  let component: OrdesPageComponent;
  let fixture: ComponentFixture<OrdesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
