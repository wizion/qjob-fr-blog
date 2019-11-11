import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeOnPostsComponent } from './subscribe-on-posts.component';

describe('SubscribeOnPostsComponent', () => {
  let component: SubscribeOnPostsComponent;
  let fixture: ComponentFixture<SubscribeOnPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeOnPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeOnPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
