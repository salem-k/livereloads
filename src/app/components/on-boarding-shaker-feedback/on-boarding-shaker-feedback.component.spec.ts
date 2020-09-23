import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnBoardingShakerFeedbackComponent } from './on-boarding-shaker-feedback.component';

describe('OnBoardingShakerFeedbackComponent', () => {
  let component: OnBoardingShakerFeedbackComponent;
  let fixture: ComponentFixture<OnBoardingShakerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnBoardingShakerFeedbackComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnBoardingShakerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
