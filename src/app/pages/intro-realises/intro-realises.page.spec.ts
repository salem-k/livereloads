import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroRealisesPage } from './intro-realises.page';

describe('IntroRealisesPage', () => {
  let component: IntroRealisesPage;
  let fixture: ComponentFixture<IntroRealisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroRealisesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroRealisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
