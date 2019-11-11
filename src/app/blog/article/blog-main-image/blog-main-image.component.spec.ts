import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMainImageComponent } from './blog-main-image.component';

describe('BlogMainImageComponent', () => {
  let component: BlogMainImageComponent;
  let fixture: ComponentFixture<BlogMainImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogMainImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogMainImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
