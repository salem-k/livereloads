import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetDataFromLinkedInPage } from './get-data-from-linked-in.page';

describe('GetDataFromLinkedInPage', () => {
  let component: GetDataFromLinkedInPage;
  let fixture: ComponentFixture<GetDataFromLinkedInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetDataFromLinkedInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetDataFromLinkedInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
