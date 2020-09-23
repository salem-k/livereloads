import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListSollicitationPage } from './list-sollicitation.page';

describe('ListSollicitationPage', () => {
  let component: ListSollicitationPage;
  let fixture: ComponentFixture<ListSollicitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSollicitationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListSollicitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
