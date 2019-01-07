import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerReportsComponent } from './retailer-reports.component';

describe('RetailerReportsComponent', () => {
  let component: RetailerReportsComponent;
  let fixture: ComponentFixture<RetailerReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
