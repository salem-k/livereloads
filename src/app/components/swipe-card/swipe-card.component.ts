import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';

@Component({
  selector: 'swipe-card',
  templateUrl: './swipe-card.component.html',
  styleUrls: ['./swipe-card.component.scss'],
})
export class SwipeCardComponent implements OnInit {
  @Input() data: any = {};
  @Input() isPreview: boolean = false;
  @Output() onNoMoreSlide = new EventEmitter();
  @Output() onViewInfo = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  handleNoMoreSlide(isOnTheLeft: boolean) {
    this.onNoMoreSlide.emit(isOnTheLeft);
  }

  handleViewInfo() {
    this.onViewInfo.emit();
  }

}
