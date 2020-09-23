import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstPageSearchPage } from './first-page-search.page';

describe('FirstPageSearchPage', () => {
  let component: FirstPageSearchPage;
  let fixture: ComponentFixture<FirstPageSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPageSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstPageSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
