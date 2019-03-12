import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WVAlertBoxComponent } from './wv-alert-box.component';

describe('AlertBoxComponent', () => {
  let component: WVAlertBoxComponent;
  let fixture: ComponentFixture<WVAlertBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WVAlertBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WVAlertBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
