import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-email-page',
  templateUrl: './email-page.page.html',
  styleUrls: ['./email-page.page.scss'],
})
export class EmailPagePage implements OnInit {
  check1: boolean = false;
  check2: boolean = true;
  check3: boolean = false;
  check4: boolean = true;
  check5: boolean = false;
  checked5: boolean = true;
  constructor(private location: Location) {}

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }
  checkListCheck1() {
      this.check1 = !this.check1;
      this.check2 = false;
      this.check3 = false;
      if(this.check1 == false)
      this.check3 = true;
    
  }
  checkListCheck2() {
      this.check2 = !this.check2;
      this.check1 = false;
      this.check3 = false
      if(this.check2 == false)
      this.check3 = true;
    
  }
  checkListCheck3() {
      this.check3 = !this.check3;
      this.check2 = false;
      this.check1 = false;
      if(this.check3 == false)
      this.check3 = true;
    
  }
  checkListCheck4() {
    this.check4 = !this.check4;
    this.check5 = false;
    if(this.check4 == false)
    this.check5 = true;
  }
 checkListCheck5() {
   if(this.check5 === true)
   {
     console.log(this.checked5 , this.check5)
   }
   else {
    this.check5 = !this.check5;
    this.check4 = false;
   }
  }

   
}
