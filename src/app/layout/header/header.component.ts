import { AfterViewInit, Component,Host, OnInit,Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from '../../framework/core';
import { PlatformService } from '../../framework/platform';
import { BlogComponent } from '../../blog/blog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit, AfterViewInit {
   
  sideMenuVisible = false;
  categoriesVisible = false;

sideMenuVisibility$: Subject<boolean> = new Subject<boolean>();

  private sideMenuWidth = 0;
  private isSmall = false;
  constructor(
    @Host() private readonly blog: BlogComponent,
    private readonly renderer: Renderer2,
    private readonly platform: PlatformService) {
    super();
  }

  ngAfterViewInit(): void {
    console.log("i loaded");
    this.sideMenuVisibility$
      .pipe(
        tap(visible => {
          if (!visible) {
            this.renderer.setAttribute(
              this.blog.mainContentLayer.nativeElement, 'style', 'transform: translateX(0)'
            );
          }
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
  }




  ngOnInit(): void {
    this.platform
      .viewportSize
      .smallDown$
      .pipe(
        tap(isSmall => this.isSmall = isSmall),
        tap(() => this.checkScroll()),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
  }





   toggleCategories(visibility?: boolean): void {
    this.categoriesVisible = typeof visibility !== 'undefined' ? visibility : !this.categoriesVisible;
  }
    toggleSideMenu(visibility?: boolean): void {
    this.sideMenuVisible = typeof visibility !== 'undefined' ? visibility : !this.sideMenuVisible;
    this.sideMenuVisibility$.next(this.sideMenuVisible);
    this.checkScroll();
  }


  sideMenuWidthChange(width: number): void {
    this.sideMenuWidth = width;
    if (this.sideMenuVisible) {
      this.renderer.setAttribute(
        this.blog.mainContentLayer.nativeElement,
        'style',
        `transform: translateX(${Math.round(this.sideMenuWidth) + 32}px)`
      );
    } 
  }
  private checkScroll(): void {
    if (this.isSmall && this.sideMenuVisible) {
      this.blog.disableScroll();
    } else {
      this.blog.enableScroll();
    }
  }
}
