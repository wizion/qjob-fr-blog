import { Component, OnInit,OnChanges,SimpleChanges,Input,HostListener,ViewChild, ElementRef } from '@angular/core';
import {BlogTextComponent} from '../blog-text/blog-text.component';


@Component({
  selector: 'app-blog-main-image',
  templateUrl: './blog-main-image.component.html',
  styleUrls: ['./blog-main-image.component.scss']
})
export class BlogMainImageComponent implements OnInit, OnChanges {
  @Input('Poster') postdata: { big_poster: string, small_poster: string, title: string, description: string, views: number };
  @Input('offset') offset: number;
  @ViewChild("share", {static: false}) share: ElementRef;


  href:string = window.location.href;
  posterImage: string;

  constructor() { }

	ngOnInit() {
	}


	shareBlock(){
		if(!this.share.nativeElement.children[1].classList.contains('opened')){
			this.share.nativeElement.children[1].classList.add("opened");
			this.share.nativeElement.children[1].children[1].style.top = this.share.nativeElement.children[0].offsetTop - (this.share.nativeElement.children[1].children[1].clientHeight +20) +"px";
			this.share.nativeElement.children[1].children[1].style.left = this.share.nativeElement.children[0].offsetLeft - (this.share.nativeElement.children[1].children[1].clientWidth -38)+"px";
			if(window.innerWidth <= 640){
				this.share.nativeElement.children[1].children[1].style.left = "2.5%";
				this.share.nativeElement.children[1].children[1].style.top = "75%";
			}
		}else{
			this.share.nativeElement.children[1].classList.remove("opened");
		}
	}

	onArrowClick(){
		window.scrollTo({ left: 0, top: this.offset, behavior: 'smooth' });
	}

	resizeOnLoad(){
		if(window.innerWidth <= 681){
			setTimeout(() => {
				this.posterImage = this.postdata.small_poster;
			});
		}else{
			setTimeout(() => {
				this.posterImage = this.postdata.big_poster;
			});
		}
	}

	  ngOnChanges(changes: SimpleChanges) {
 		this.resizeOnLoad();
	  }

	@HostListener('window:resize', ['$event']) onResize(event) {
	  if(event.target.innerWidth <= 681){
  		this.posterImage = this.postdata.small_poster;
	  }else{
  		this.posterImage = this.postdata.big_poster;
	  }
	  if(this.share.nativeElement.children[1].classList.contains('opened')){
			this.share.nativeElement.children[1].classList.add("opened");
			this.share.nativeElement.children[1].children[1].style.top = this.share.nativeElement.children[0].offsetTop - (this.share.nativeElement.children[1].children[1].clientHeight +20) +"px";
			this.share.nativeElement.children[1].children[1].style.left = this.share.nativeElement.children[0].offsetLeft - (this.share.nativeElement.children[1].children[1].clientWidth -38)+"px";
			if(event.target.innerWidth <= 640){
				this.share.nativeElement.children[1].children[1].style.left = "2.5%";
				this.share.nativeElement.children[1].children[1].style.top = "75%";
			}
	  }

	}


}