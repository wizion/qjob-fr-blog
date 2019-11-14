import { BrowserModule } from '@angular/platform-browser';
import { Injector,NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgsRevealModule } from 'ngx-scrollreveal';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ArticleComponent } from './blog/article/article.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { UiElementsComponent } from './ui-elements/ui-elements.component';
import { UiHamburgerComponent } from './ui-elements/ui-hamburger/ui-hamburger.component';
import { LanguageSwitcherComponent } from './ui-elements/language-switcher/language-switcher.component';
import { HeaderArticleComponent } from './layout/header-article/header-article.component';
import { BlogMainImageComponent } from './blog/article/blog-main-image/blog-main-image.component';
import { BlogTextComponent } from './blog/article/blog-text/blog-text.component';
import { RelatedPostsComponent } from './blog/article/related-posts/related-posts.component';
import { SubscribeOnPostsComponent } from './blog/article/subscribe-on-posts/subscribe-on-posts.component';
import { HeaderSideMenuComponent } from './layout/components/header-side-menu/header-side-menu.component';

import { PlatformModule, RESPONSIVE_BREAKPOINTS_CONFIG, ResponsiveBreakpointsConfiguration } from './framework/platform';
import { ROUTING_HISTORY_MAX_LENGTH } from './framework/platform/routing-history.service';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export const RESPONSIVE_BREAKPOINTS: ResponsiveBreakpointsConfiguration = {
  labels: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
  values: [0,         360,     640,      1024,    1280,     1440,      1920]
};
export const HISTORY_MAX_LENGTH = 5;


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    NotFoundComponent,
    UiElementsComponent,
    UiHamburgerComponent,
    LanguageSwitcherComponent,
    HeaderArticleComponent,
    BlogMainImageComponent,
    BlogTextComponent,
    RelatedPostsComponent,
    SubscribeOnPostsComponent,
    HeaderSideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgsRevealModule,
    PerfectScrollbarModule,
    PlatformModule.forRoot([
        {
          provide: RESPONSIVE_BREAKPOINTS_CONFIG,
          useValue: RESPONSIVE_BREAKPOINTS
        }
      ])
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: ROUTING_HISTORY_MAX_LENGTH,
      useValue: HISTORY_MAX_LENGTH
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
