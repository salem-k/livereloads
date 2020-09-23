import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailPagePage } from './email-page.page';

describe('EmailPagePage', () => {
  let component: EmailPagePage;
  let fixture: ComponentFixture<EmailPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
