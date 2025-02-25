import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByIngreditenrsDialogComponent } from './search-by-ingreditenrs-dialog.component';

describe('SearchByIngreditenrsDialogComponent', () => {
  let component: SearchByIngreditenrsDialogComponent;
  let fixture: ComponentFixture<SearchByIngreditenrsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchByIngreditenrsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByIngreditenrsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
