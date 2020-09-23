import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpRequalificationCardPage } from './pop-up-requalification-card.page';

describe('PopUpRequalificationCardPage', () => {
  let component: PopUpRequalificationCardPage;
  let fixture: ComponentFixture<PopUpRequalificationCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpRequalificationCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpRequalificationCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
