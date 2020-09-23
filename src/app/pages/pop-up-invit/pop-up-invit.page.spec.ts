import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpInvitPage } from './pop-up-invit.page';

describe('PopUpInvitPage', () => {
  let component: PopUpInvitPage;
  let fixture: ComponentFixture<PopUpInvitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpInvitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpInvitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
