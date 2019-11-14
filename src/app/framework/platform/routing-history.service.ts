import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export const ROUTING_HISTORY_MAX_LENGTH = new InjectionToken<number>('ROUTING_HISTORY_MAX_LENGTH');

@Injectable()
export class RoutingHistoryService {
  linkBase = '/';
  readonly layoutScrollingEv: BehaviorSubject<Event> = new BehaviorSubject(undefined);
  readonly routerScrollEv: BehaviorSubject<Scroll> = new BehaviorSubject(undefined);

  private history: any = [];
  private layoutYScrollPositions: {
    [key: string]: number
  } = {};

  constructor(
    private router: Router,
    @Optional() @Inject(ROUTING_HISTORY_MAX_LENGTH) historyMaxLength: number
  ) {
    const maxLength = historyMaxLength || 10;

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...(this.history.slice(-maxLength + 1)), urlAfterRedirects];
      });

    this.router.events
      .pipe(
        filter(event => event instanceof Scroll)
      )
      .subscribe(this.routerScrollEv);
  }

  setLinkBase(base: string): void {
    this.linkBase = base;
  }

  setLayoutYPosition(url: string, position: number): void {
    this.layoutYScrollPositions[url] = position;
  }

  getLayoutYPosition(url: string): number {
    return this.layoutYScrollPositions[url] ? this.layoutYScrollPositions[url] : 0;
  }

  getHistory(): Array<string> {
    return this.history;
  }

  getHistoryLength(): number {
    return this.history.length;
  }

  getPreviousUrl(def = '/'): string {
    return this.history[this.history.length - 2] || def;
  }

  locationBack(def = '/'): void {
    this.router.navigateByUrl(this.getPreviousUrl(def));
  }
}
