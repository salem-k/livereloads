import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchTab1Page } from './search-tab1.page';

describe('SearchTab1Page', () => {
  let component: SearchTab1Page;
  let fixture: ComponentFixture<SearchTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTab1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
