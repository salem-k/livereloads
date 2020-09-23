import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpinnerPagePage } from './spinner-page.page';

describe('SpinnerPagePage', () => {
  let component: SpinnerPagePage;
  let fixture: ComponentFixture<SpinnerPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
