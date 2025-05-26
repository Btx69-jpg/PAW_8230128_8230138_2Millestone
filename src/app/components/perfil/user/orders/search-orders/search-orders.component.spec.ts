import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrdersComponentPerfilUser } from './search-orders.component';

describe('SearchOrdersComponent', () => {
  let component: SearchOrdersComponentPerfilUser;
  let fixture: ComponentFixture<SearchOrdersComponentPerfilUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchOrdersComponentPerfilUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOrdersComponentPerfilUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
