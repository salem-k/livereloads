import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PotentielReseauPage } from './potentiel-reseau.page';

describe('PotentielReseauPage', () => {
  let component: PotentielReseauPage;
  let fixture: ComponentFixture<PotentielReseauPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentielReseauPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PotentielReseauPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
