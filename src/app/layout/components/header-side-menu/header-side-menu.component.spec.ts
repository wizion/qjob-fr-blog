import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSideMenuComponent } from './header-side-menu.component';

describe('HeaderSideMenuComponent', () => {
  let component: HeaderSideMenuComponent;
  let fixture: ComponentFixture<HeaderSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
