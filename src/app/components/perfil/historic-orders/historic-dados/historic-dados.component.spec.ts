import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricDadosComponent } from './historic-dados.component';

describe('HistoricDadosComponent', () => {
  let component: HistoricDadosComponent;
  let fixture: ComponentFixture<HistoricDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
