import { Component, OnInit,Inject,HostListener  } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from '../../api.service';
import { BlogList } from '../../blog-list';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

	alias: string;
	headers: any;
	spresp: any;
	postdata: BlogList = {};
	posterImage: string;
	imageObject: Array<Object>; 
  offset: number;
  indicatorHeight: string;

  constructor(private route: ActivatedRoute,private api: ApiService,@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  	this.alias = this.route.snapshot.params['alias'];
  	this.getPostById(this.alias);
}


	initngSlider(slider: any){
		this.imageObject = [];
	}



@HostListener('window:scroll', ['$event']) progressBarWidth(event){


    let scrollPercent = (window.scrollY / (this.document.body.scrollHeight - window.innerHeight))*100;;
    this.indicatorHeight = scrollPercent + '%';
    console.log(this.indicatorHeight);
  }





scrollVariable(scroll: {offsetTopBodyText: number}){
  this.offset = scroll.offsetTopBodyText;
}

  getPostById(alias: any) {
    this.api.getBlogPostById(alias)
      .subscribe(data => {
			this.postdata = data[0];
			//console.log(this.postdata);
      });
  }


}
