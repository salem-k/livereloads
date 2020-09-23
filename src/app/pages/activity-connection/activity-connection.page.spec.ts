import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivityConnectionPage } from './activity-connection.page';

describe('ActivityConnectionPage', () => {
  let component: ActivityConnectionPage;
  let fixture: ComponentFixture<ActivityConnectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityConnectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
