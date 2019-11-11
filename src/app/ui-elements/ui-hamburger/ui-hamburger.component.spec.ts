import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiHamburgerComponent } from './ui-hamburger.component';

describe('UiHamburgerComponent', () => {
  let component: UiHamburgerComponent;
  let fixture: ComponentFixture<UiHamburgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiHamburgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiHamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
