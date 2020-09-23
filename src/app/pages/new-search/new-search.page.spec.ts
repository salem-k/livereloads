import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSearchPage } from './new-search.page';

describe('NewSearchPage', () => {
  let component: NewSearchPage;
  let fixture: ComponentFixture<NewSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
