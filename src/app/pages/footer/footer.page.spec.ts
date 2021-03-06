import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FooterPage } from './footer.page';

describe('FooterPage', () => {
  let component: FooterPage;
  let fixture: ComponentFixture<FooterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
