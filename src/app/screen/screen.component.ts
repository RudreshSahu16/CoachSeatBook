import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommanService } from 'src/services/comman.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  constructor(private commanService:CommanService, private router:Router) { }
  coachNumber:any;
  ngOnInit() {
    this.commanService.showSpinner();
  }
  valueselected(value){
    this.coachNumber=value
  }
  moveTo(){
    if(this.coachNumber == '0' || this.coachNumber === undefined){
      this.commanService.snackBar.openSnackBar("Please Select coachNumber",false)
    }
    else{
      var queryParam={'coachNumber':this.coachNumber}
      this.router.navigate(['checkCoachSeats'],{ queryParams: queryParam })
    }
  }

}
