import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSearch2Page } from './new-search2.page';

describe('NewSearch2Page', () => {
  let component: NewSearch2Page;
  let fixture: ComponentFixture<NewSearch2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearch2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSearch2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
