import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecurityAndConnectionPage } from './security-and-connection.page';

describe('SecurityAndConnectionPage', () => {
  let component: SecurityAndConnectionPage;
  let fixture: ComponentFixture<SecurityAndConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityAndConnectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityAndConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
