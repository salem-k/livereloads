import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SynchLinkedInPagePage } from './synch-linked-in-page.page';

describe('SynchLinkedInPagePage', () => {
  let component: SynchLinkedInPagePage;
  let fixture: ComponentFixture<SynchLinkedInPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynchLinkedInPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SynchLinkedInPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
