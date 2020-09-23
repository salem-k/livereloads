import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpMessageInvitSentPage } from './pop-up-message-invit-sent.page';

describe('PopUpMessageInvitSentPage', () => {
  let component: PopUpMessageInvitSentPage;
  let fixture: ComponentFixture<PopUpMessageInvitSentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpMessageInvitSentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpMessageInvitSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
