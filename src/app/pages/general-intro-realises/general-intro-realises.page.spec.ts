import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralIntroRealisesPage } from './general-intro-realises.page';

describe('GeneralIntroRealisesPage', () => {
  let component: GeneralIntroRealisesPage;
  let fixture: ComponentFixture<GeneralIntroRealisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralIntroRealisesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralIntroRealisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
