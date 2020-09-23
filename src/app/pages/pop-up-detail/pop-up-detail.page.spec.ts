import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpDetailPage } from './pop-up-detail.page';

describe('PopUpDetailPage', () => {
  let component: PopUpDetailPage;
  let fixture: ComponentFixture<PopUpDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
