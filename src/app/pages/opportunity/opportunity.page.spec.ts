import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpportunityPage } from './opportunity.page';

describe('OpportunityPage', () => {
  let component: OpportunityPage;
  let fixture: ComponentFixture<OpportunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpportunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
