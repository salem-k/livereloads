import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSearchSecteurPage } from './new-search-secteur.page';

describe('NewSearchSecteurPage', () => {
  let component: NewSearchSecteurPage;
  let fixture: ComponentFixture<NewSearchSecteurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearchSecteurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSearchSecteurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
