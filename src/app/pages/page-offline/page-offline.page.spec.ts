import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageOfflinePage } from './page-offline.page';

describe('PageOfflinePage', () => {
  let component: PageOfflinePage;
  let fixture: ComponentFixture<PageOfflinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOfflinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageOfflinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
