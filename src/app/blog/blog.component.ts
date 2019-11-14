import { 
  Component,
  OnInit,
  OnChanges,
  Renderer2,
  EventEmitter,
  Output,
  SimpleChanges,
  ElementRef,
  ViewChild,
  HostListener,
  HostBinding,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { NavigationStart, Router, Scroll } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { BlogList } from '../blog-list';

import { BaseComponent } from '../framework/core';
import { PlatformService } from '../framework/platform';
import { RoutingHistoryService } from '../framework/platform/routing-history.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent
  extends BaseComponent
 implements OnInit, OnChanges, AfterViewInit{

	blog: BlogList[] = [];
	headers: any;
	spresp: any;
	postdata: BlogList;
	allPosts = [];

  @HostBinding('class.mobile-layout') isMobile = this.platform.isMobile;
  @HostBinding('class.is-small') isSmall = false;

  scrollDisabled = this.isMobile;

  @ViewChild('main', { static: true }) main: ElementRef;
  @ViewChild('mainContent', { static: false }) mainContent: ElementRef;
  @ViewChild('mainContentLayer', { static: false }) mainContentLayer: ElementRef;
  @ViewChild(PerfectScrollbarDirective, { static: false }) scrollbar: PerfectScrollbarDirective;
  
  @Output() readonly layoutScrollingEv: EventEmitter<Event> = new EventEmitter();



  constructor(
    private api: ApiService,
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
        private readonly routingHistory: RoutingHistoryService,
    private readonly platform: PlatformService) {
    super();
  }

  ngOnInit() {
    this.getBlogPosts();

    this.platform
      .viewportSize
      .smallDown$
      .pipe(
        tap(isSmall => this.isSmall = isSmall),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
  }




  ngAfterViewInit(): void {
    if (!this.platform.isMobile) {
      this.scrollbar.psScrollY
        .pipe(
          map(({ target }: { target: HTMLElement }) => target.scrollTop > 0),
          tap(scrolled => this.scrollbarOnScroll(scrolled)),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe();

      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationStart &&
              typeof this.mainContent !== 'undefined' &&
              typeof this.mainContent.nativeElement !== 'undefined'
          ),
          tap((event: NavigationStart) => this.routingHistory
            .setLayoutYPosition(this.router.url, this.mainContent.nativeElement.scrollTop)),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe();

      this.router.events
        .pipe(
          filter(routerEvent => routerEvent instanceof Scroll),
          tap((e: Scroll) => {
            if (typeof e.position !== 'undefined' && e.position !== null && e.position.length > 0) {
              this.scrollTo(this.routingHistory.getLayoutYPosition(e.routerEvent.urlAfterRedirects));
            } else {
              this.scrollTo(0);
            }
          }),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe();
    } else {
      this.router.events
        .pipe(
          filter(routerEvent => routerEvent instanceof Scroll),
          tap((e: Scroll) => {
            if (e.position === null && e.anchor === null) {
              this.scrollTo(0);
            }
          }),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe();
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.mainContentLayer);
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll($event: Event): void {
    if (this.scrollDisabled) {
      $event.preventDefault();
    }
  }


  scrollTo(scrollPos = 0): void {
    if (this.isMobile && this.platform.isBrowser) {
      this.platform.window.scrollTo(0, scrollPos);
    } else {
      this.mainContent.nativeElement.scrollTop = scrollPos;
    }
  }
  scrollbarOnScroll(scrolled: boolean): void {
    scrolled
      ? this.renderer.addClass(this.elementRef.nativeElement, 'scrolled')
      : this.renderer.removeClass(this.elementRef.nativeElement, 'scrolled');
  }
  onScroll(ev: Event): void {
    this.layoutScrollingEv.next(ev);
  }
  disableScroll(): void {
    this.scrollDisabled = true;

    if (this.isMobile) {
      this.renderer.addClass(this.platform.window.document.body, 'disable-scroll');
    }
  }

  enableScroll(): void {
    this.scrollDisabled = false;

    if (this.isMobile) {
      this.renderer.removeClass(this.platform.window.document.body, 'disable-scroll');
    }
  }
  onTouchmove(ev: Event): void {
    if (this.isMobile && this.scrollDisabled) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }

   getBlogPosts() {
    this.api.getBlogPosts()
      .subscribe(data => {
      	this.allPosts = data;
      });
  }
  private windowScrollTop(): number {
    if (!this.platform.isBrowser) {
      return 0;
    }

    const supportPageOffset = window.pageXOffset !== undefined;
    const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

    return supportPageOffset ?
      window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop :
        document.body.scrollTop;
  }
}