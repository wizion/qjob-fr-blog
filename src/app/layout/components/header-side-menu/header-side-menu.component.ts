import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, HostBinding,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { openCloseAnimation } from './animations';
import { BaseComponent } from '../../../framework/core';
import { PlatformService } from '../../../framework/platform';

@Component({
  selector: 'app-header-side-menu',
  templateUrl: './header-side-menu.component.html',
  styleUrls: ['./header-side-menu.component.scss'],
 animations: [openCloseAnimation]
})
export class HeaderSideMenuComponent extends BaseComponent implements OnInit {

	@Input() readonly visible = false;
	@Input() readonly anchorEl: Element;
	@Output() readonly visibleChange = new EventEmitter<boolean>();
	@Output() readonly widthChange = new EventEmitter<number>();

	@ViewChild('menu', { static: false }) menu: ElementRef;
	@HostBinding('class.is-mobile-device') isMobile = this.platform.isMobile;
	@HostBinding('class.is-desktop-device') isDesktop = !this.platform.isMobile;

  left = 0;
  height: number;
  private suppressClick = true;

  constructor(
    private readonly platform: PlatformService,
    private readonly cdr: ChangeDetectorRef,
    private readonly zone: NgZone,
    private readonly router: Router
  	) { super(); }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart && this.platform.isMobile
        ),
        tap(() => this.visibleChange.next(false)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
  }


  calcHeight(): void {
    if (!this.visible || !this.platform.isBrowser) {
      return;
    }
    this.height = this.platform.window.innerHeight;
  }

  calcPosLeft(): void {
    if (!this.visible) {
      return;
    }
    this.left = this.anchorEl.getBoundingClientRect().left || 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.platform.isBrowser && changes.visible.currentValue) {
      this.calcPosLeft();
      this.calcHeight();

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.widthChange.next(this.menu.nativeElement.getBoundingClientRect().width);
        });
      });
    }

    if (changes.visible.currentValue && !changes.visible.previousValue) {
      this.suppressClick = true;
    }
  }


  @HostListener('click') onComponentClick(): void {
    this.suppressClick = true;
  }
  @HostListener('window:click') onWindowClick(): void {
    if (this.visible) {
      if (!this.suppressClick) {
        this.visibleChange.next(false);
      } else {
        this.suppressClick = false;
      }
    }
  }

  @HostListener('window:scroll') onScroll(): void {
    if (!this.visible || !this.menu.nativeElement || !this.isMobile) {
      return;
    }

    this.calcHeight();
  }


  @HostListener('window:resize') onResize(): void {
    if (!this.visible || !this.menu.nativeElement) {
      return;
    }
    this.calcPosLeft();
    this.calcHeight();
    this.widthChange.next(this.menu.nativeElement.getBoundingClientRect().width);
  }

}
