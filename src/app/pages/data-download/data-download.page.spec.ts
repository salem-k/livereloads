import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataDownloadPage } from './data-download.page';

describe('DataDownloadPage', () => {
  let component: DataDownloadPage;
  let fixture: ComponentFixture<DataDownloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDownloadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataDownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
