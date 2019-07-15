import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialOptionsComponent } from './special-options.component';

describe('SpecialOptionsComponent', () => {
  let component: SpecialOptionsComponent;
  let fixture: ComponentFixture<SpecialOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
