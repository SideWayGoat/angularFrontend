import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimedataComponent } from './realtimedata.component';

describe('RealtimedataComponent', () => {
  let component: RealtimedataComponent;
  let fixture: ComponentFixture<RealtimedataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealtimedataComponent]
    });
    fixture = TestBed.createComponent(RealtimedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
