// angular
import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

import { interval, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponsiveBreakpointsConfiguration {
  labels: Array<string>;
  values: Array<number>;
}

export const RESPONSIVE_BREAKPOINTS_CONFIG = new InjectionToken<string>('RESPONSIVE_BREAKPOINTS_CONFIG');

export interface Breakpoints {
  [label: string]: string;
}

export interface ViewportSize {
  [observable$: string]: Observable<boolean>;
}

export class PopupWindowEvent {
  timestamp: number;

  constructor() {
    this.timestamp = + new Date();
  }
}

export class PopupWindowOpenEvent extends PopupWindowEvent {
  constructor(
    public payload?: any
  ) {
    super();
  }
}

export class PopupWindowCloseEvent extends PopupWindowEvent {
  constructor(
    public payload?: any
  ) {
    super();
  }
}

export class PopupWindowMessageEvent extends PopupWindowEvent {
  constructor(
    public payload: MessageEvent
  ) {
    super();
  }
}

@Injectable()
export class PlatformService {
  responsiveBreakpoints: Breakpoints = {};
  viewportSize: ViewportSize = {};

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private readonly breakpointObserver: BreakpointObserver,
    @Inject(RESPONSIVE_BREAKPOINTS_CONFIG) breakpointsConfig: ResponsiveBreakpointsConfiguration
  ) {
    this.buildResponsiveObservables(breakpointsConfig);
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isMobile(): boolean {
    return this.isBrowser && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  get window(): Window | undefined {
    return this.isBrowser ? window : undefined;
  }

  get document(): Document | undefined {
    return this.isBrowser ? document : undefined;
  }

  isMatched(mediaQuery: string): boolean {
    return this.breakpointObserver.isMatched(mediaQuery);
  }

  setToLocalstorage(key: string, value: any): void {
    if (!this.isBrowser) { return; }

    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalstorage(key: string): any {
    if (!this.isBrowser) { return undefined; }

    if (typeof localStorage.getItem(key) !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    }

    return undefined;
  }

  removeFromLocalstorage(key: string): void {
    if (!this.isBrowser) { return; }

    localStorage.removeItem(key);
  }

  popupCenter(url: string, title: string, w: number, h: number): Observable<PopupWindowEvent> {
    if (!this.isBrowser) {
      return new Observable((subscriber: Subscriber<PopupWindowEvent>) => {
        subscriber.complete();
      });
    }

    return new Observable((subscriber: Subscriber<PopupWindowEvent>) => {
      const timer = interval(100);

      const dualScreenLeft = typeof window.screenLeft !== 'undefined' ? window.screenLeft : (screen as any).left;
      const dualScreenTop = typeof window.screenTop !== 'undefined' ? window.screenTop : (screen as any).top;

      const width = window.innerWidth ?
        window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth :
          screen.width;
      const height = window.innerHeight ?
        window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight :
          screen.height;

      const left = ((width / 2) - (w / 2)) + dualScreenLeft;
      const top = ((height / 2) - (h / 2)) + dualScreenTop;

      const callbackFn = (message: MessageEvent) => {
        subscriber.next(new PopupWindowMessageEvent(message));
      };

      window.addEventListener('message', callbackFn, false);

      const newWindow = window.open(url, title, `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);
      subscriber.next(new PopupWindowOpenEvent(newWindow));

      if (window.focus) {
        newWindow.focus();
      }

      const innerSubscription = timer.subscribe(() => {
        if (newWindow.closed) {
          subscriber.next(new PopupWindowCloseEvent());
          window.removeEventListener('message', callbackFn, false);
          innerSubscription.unsubscribe();
          subscriber.complete();
        }
      });
    });
  }

  private buildResponsiveObservables(breakpointsConfig: ResponsiveBreakpointsConfiguration): void {
    breakpointsConfig.labels.forEach((breakpointLabel: string, index: number) => {
      if (index === 0) {
        this.responsiveBreakpoints[`${breakpointLabel}`] = `(max-width: ${breakpointsConfig.values[index + 1] - 1}px)`;
      }

      if (index !== 0 && index !== breakpointsConfig.labels.length - 1) {
        this.responsiveBreakpoints[`${breakpointLabel}Down`] = `(max-width: ${breakpointsConfig.values[index + 1] - 1}px)`;
        this.responsiveBreakpoints[`${breakpointLabel}`] =
          `(min-width: ${breakpointsConfig.values[index]}px) and (max-width: ${breakpointsConfig.values[index + 1] - 1}px)`;
        this.responsiveBreakpoints[`${breakpointLabel}Up`] = `(min-width: ${breakpointsConfig.values[index]}px)`;
      }

      if (index === breakpointsConfig.labels.length - 1) {
        this.responsiveBreakpoints[`${breakpointLabel}`] = `(min-width: ${breakpointsConfig.values[index]}px)`;
      }
    });

    for (const breakpointLabel in this.responsiveBreakpoints) {
      if (this.responsiveBreakpoints.hasOwnProperty(breakpointLabel)) {
        this.viewportSize[`${breakpointLabel}$`] = this.breakpointObserver
          .observe([this.responsiveBreakpoints[breakpointLabel]])
          .pipe(
            map(state => state.matches)
          );
      }
    }
  }
}
