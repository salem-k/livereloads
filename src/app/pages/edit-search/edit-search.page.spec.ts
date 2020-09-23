import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSearchPage } from './edit-search.page';

describe('EditSearchPage', () => {
  let component: EditSearchPage;
  let fixture: ComponentFixture<EditSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
