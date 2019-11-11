import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BlogComponent} from './blog/blog.component';
import {ArticleComponent} from './blog/article/article.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{ 
			path: 'blog',
			component: BlogComponent,
	},
	{
			path: 'blog/:alias',
			component: ArticleComponent
	},
	{path:'not-found', component: NotFoundComponent},
	{path: '**', redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
