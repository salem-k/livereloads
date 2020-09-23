import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpRelationPage } from './pop-up-relation.page';

describe('PopUpRelationPage', () => {
  let component: PopUpRelationPage;
  let fixture: ComponentFixture<PopUpRelationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpRelationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpRelationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
