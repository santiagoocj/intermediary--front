import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminComponent } from './home-admin.component';

describe('HomeAdminComponent', () => {
  let component: HomeAdminComponent;
  let fixture: ComponentFixture<HomeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
document.addEventListener("DOMContentLoaded", function(event) {
   
  const showNavbar = (toggleId:any, navId:any, bodyId:any, headerId:any) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId),
  bodypd = document.getElementById(bodyId),
  headerpd = document.getElementById(headerId)
  
  // Validate that all variables exist
  if(toggle && nav && bodypd && headerpd){
  toggle.addEventListener('click', ()=>{
  // show navbar
  nav.classList.toggle('show')
  // change icon
  toggle.classList.toggle('bx-x')
  // add padding to body
  bodypd.classList.toggle('body-pd')
  // add padding to header
  headerpd.classList.toggle('body-pd')
  })
  }
  }
  
  showNavbar('header-toggle','nav-bar','body-pd','header')
  
  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')
  
  function colorLink(this: any){
  if(linkColor){
  linkColor.forEach(l=> l.classList.remove('active'))
  this.classList.add('active')
  }
  }
  linkColor.forEach(l=> l.addEventListener('click', colorLink))
  
   // Your code to run since DOM is loaded and ready
  });