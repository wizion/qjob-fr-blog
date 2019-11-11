import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BlogList } from '../blog-list';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

	blog: BlogList[] = [];
	headers: any;
	spresp: any;
	postdata: BlogList;
	allPosts = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getBlogPosts();
  }


   getBlogPosts() {
    this.api.getBlogPosts()
      .subscribe(data => {
      	this.allPosts = data;
      });
  }

}