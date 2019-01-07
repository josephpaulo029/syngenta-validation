import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowersReportsComponent } from './growers-reports.component';

describe('GrowersReportsComponent', () => {
  let component: GrowersReportsComponent;
  let fixture: ComponentFixture<GrowersReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowersReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
