import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-hamburger',
  templateUrl: './ui-hamburger.component.html',
  styleUrls: ['./ui-hamburger.component.scss']
})
export class UiHamburgerComponent {
  @Input() active = false;
  @Output() readonly activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onButtonClick(): void {
    this.activeChange.next(!this.active);
  }

}
