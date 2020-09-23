import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpMessageInvitPage } from './pop-up-message-invit.page';

describe('PopUpMessageInvitPage', () => {
  let component: PopUpMessageInvitPage;
  let fixture: ComponentFixture<PopUpMessageInvitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpMessageInvitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpMessageInvitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
