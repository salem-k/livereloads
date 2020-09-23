import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifPasswordPage } from './verif-password.page';

describe('VerifPasswordPage', () => {
  let component: VerifPasswordPage;
  let fixture: ComponentFixture<VerifPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
