import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyInfoPagePage } from './verify-info-page.page';

describe('VerifyInfoPagePage', () => {
  let component: VerifyInfoPagePage;
  let fixture: ComponentFixture<VerifyInfoPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyInfoPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyInfoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
