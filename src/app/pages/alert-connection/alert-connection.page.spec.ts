import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertConnectionPage } from './alert-connection.page';

describe('AlertConnectionPage', () => {
  let component: AlertConnectionPage;
  let fixture: ComponentFixture<AlertConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConnectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
