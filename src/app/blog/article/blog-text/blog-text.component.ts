import { Component, Output, EventEmitter, OnInit,ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-blog-text',
  templateUrl: './blog-text.component.html',
  styleUrls: ['./blog-text.component.scss']
})
export class BlogTextComponent implements OnInit {
  @ViewChild("Scroll", {static: false}) arrowScroll: ElementRef;
  @Output('scroll') scrollEmitter: EventEmitter<any> = new EventEmitter<{offsetTopBodyText: number}>();
  scrollValue: number;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    setTimeout(() => {
        //this.scrollValue = this.arrowScroll.nativeElement.offsetTop;
        this.scrollEmitter.emit({
          offsetTopBodyText: this.arrowScroll.nativeElement.offsetTop
        });
      });
  }


}
