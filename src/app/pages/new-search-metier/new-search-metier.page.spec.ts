import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSearchMetierPage } from './new-search-metier.page';

describe('NewSearchMetierPage', () => {
  let component: NewSearchMetierPage;
  let fixture: ComponentFixture<NewSearchMetierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSearchMetierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSearchMetierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
