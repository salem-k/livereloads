import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SynchTab2Page } from './synch-tab2.page';

describe('SynchTab2Page', () => {
  let component: SynchTab2Page;
  let fixture: ComponentFixture<SynchTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynchTab2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SynchTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
