import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgsRevealModule } from 'ngx-scrollreveal';

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
    SubscribeOnPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgsRevealModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
