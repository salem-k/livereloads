import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSearchCriteresDetailsPage } from './new-search-criteres-details.page';

describe('NewSearchCriteresDetailsPage', () => {
  let component: NewSearchCriteresDetailsPage;
  let fixture: ComponentFixture<NewSearchCriteresDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearchCriteresDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSearchCriteresDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
