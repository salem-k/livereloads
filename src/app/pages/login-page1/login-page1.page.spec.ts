import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage1Page } from './login-page1.page';

describe('LoginPage1Page', () => {
  let component: LoginPage1Page;
  let fixture: ComponentFixture<LoginPage1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
