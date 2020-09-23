import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RouterOutletService {
  private routerOutlet: IonRouterOutlet;

  constructor() {}

  init(routerOutlet: IonRouterOutlet) {
    this.routerOutlet = routerOutlet;
  }

  get swipebackEnabled(): boolean {
    if (this.routerOutlet) {
      return this.routerOutlet.swipeGesture;
    } else {
      throw new Error('Call init() first!');
    }
  }

  set swipebackEnabled(value: boolean) {
    if (this.routerOutlet) {
      this.routerOutlet.swipeGesture = value;
    } else {
      throw new Error('Call init() first!');
    }
  }
}