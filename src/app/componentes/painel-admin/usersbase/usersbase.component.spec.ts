import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersbaseComponent } from './usersbase.component';

describe('UsersbaseComponent', () => {
  let component: UsersbaseComponent;
  let fixture: ComponentFixture<UsersbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersbaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
