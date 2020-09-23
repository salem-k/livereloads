import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InappbrowserPage } from './inappbrowser.page';

describe('InappbrowserPage', () => {
  let component: InappbrowserPage;
  let fixture: ComponentFixture<InappbrowserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InappbrowserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InappbrowserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
