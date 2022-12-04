import { Component, OnInit } from '@angular/core';
import{environment} from '../../environments/environment';

const BASE_URL=environment.BASE_URL;
@Component({
    template: ''
  })
export class GlobeApis implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    public  static GLOBALCOACH= BASE_URL + '/seatBooking';

    // Get seatstatus
  static GETSEATSTATUS=GlobeApis.GLOBALCOACH+'/getSeatStatus';
  static BOOKSEAT=GlobeApis.GLOBALCOACH+'/bookSeat';
}
