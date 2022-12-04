import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanService } from 'src/services/comman.service';
import { GlobeApis } from '../APIs/globeApis';
import  {HelperUtil} from 'src/utility/helpUtils';



@Component({
  selector: 'app-coachseatbooking',
  templateUrl: './coachseatbooking.component.html',
  styleUrls: ['./coachseatbooking.component.scss']
})
export class CoachseatbookingComponent implements OnInit {

  bookForm:any;
  coachNumber:any;
  BookedStatus:boolean=false;
  bookingStatus='notbooked';
  alottedSeats=[];
  message:any;
  
  constructor( private route:ActivatedRoute,public commanservice:CommanService,private router:Router) { }
  response: any;
  seats:any;
  
  ngOnInit() {

    this.bookForm=new FormGroup({
      name: new FormControl(
        '',
      Validators.compose([
        Validators.required,
      ])),
      seatsRequired:new FormControl('',Validators.compose([
        Validators.required,

      ])),
         
    })
    
    this.route.queryParams.subscribe(params => {
      this.coachNumber = params['coachNumber'];
      });
      this.commanservice.spinner.show()
      this.commanservice.httpclient.callServerForGet(GlobeApis.GETSEATSTATUS+"?coachNumber="+this.coachNumber).subscribe(
        (val)=>{
          this.response = val;
          if(HelperUtil.isSuccess(this.response) && this.response.status===200){
            this.seats=this.response.data.seatsStatus;
            this.commanservice.spinner.hide();
            this.commanservice.snackBar.openSnackBar(this.response.message,true);
          }
          
          else {
            this.commanservice.spinner.hide();
            this.commanservice.snackBar.openSnackBar(this.response.message,false);
          }
        },
        
        response => {
          if(response.error.statusCode==='ERROR'){
            this.commanservice.spinner.hide();
            this.commanservice.snackBar.openSnackBar(response.error.message,false);
          }
          else{
            this.commanservice.spinner.hide();
            this.commanservice.snackBar.openSnackBar('Please check your internet connection or Temporarily Service Not Available , Please try later.',false);
          }
        },
        
      )  
  
    
    }
    
    AllotingSeat(form){
    const seatsRequired=Number(form.value.seatsRequired)
    if((seatsRequired > 0 )&& (seatsRequired < 8)){
      const body={coachNumber:this.coachNumber,
                  seatsRequired:seatsRequired,
                name:form.value.name}
      this.commanservice.spinner.show()
      this.commanservice.httpclient.callServerForPost(GlobeApis.BOOKSEAT, body).subscribe(
        (val)=>{
        this.response = val;
        
        if(HelperUtil.isSuccess(this.response) && this.response.status===200){
          this.BookedStatus=true
          this.bookingStatus=this.response.statusCode
          this.message=this.response.message
          this.alottedSeats=this.response.BookedSeats
          this.commanservice.spinner.hide()
          window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          });
          this.commanservice.snackBar.openSnackBar("Successfully Booked",true);
          
        }
        else {
          this.commanservice.spinner.hide()
          this.commanservice.snackBar.openSnackBar(this.response.message,false);
          
        }
        },
       response => {
        if(response.error.statusCode==='ERROR'){
          this.commanservice.spinner.hide()
          this.commanservice.snackBar.openSnackBar(response.error.message,false);
        }
        else if(response.error.statusCode==='FAILURE' || response.error.statusCode==='WARNING'){
          this.message=response.message
          this.BookedStatus=true
          this.commanservice.spinner.hide()
          window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          });
          this.commanservice.snackBar.openSnackBar('OOOOOPSSSSS!!!!! :( ',false);
        }
        else{
          this.commanservice.spinner.hide()
          this.commanservice.snackBar.openSnackBar('Please check your internet connection or Temporarily Service Not Available , Please try later.',false);
        }

        },
        
        
      )
    }
    else{
      this.commanservice.snackBar.openSnackBar('Number of seats must be between 1-7 only.',false);
    }
    }
    moveTo(){
      this.router.navigate(['/'])
    }

}
