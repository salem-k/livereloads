import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MotifPagePage } from './motif-page.page';

describe('MotifPagePage', () => {
  let component: MotifPagePage;
  let fixture: ComponentFixture<MotifPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotifPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MotifPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
