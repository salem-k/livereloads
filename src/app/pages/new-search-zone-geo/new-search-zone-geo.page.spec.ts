import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSearchZoneGeoPage } from './new-search-zone-geo.page';

describe('NewSearchZoneGeoPage', () => {
  let component: NewSearchZoneGeoPage;
  let fixture: ComponentFixture<NewSearchZoneGeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearchZoneGeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSearchZoneGeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
