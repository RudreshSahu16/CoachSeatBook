import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from './screen.component';
import { CommanServicesModule } from 'src/services/comman.module';




@NgModule({
  declarations: [ScreenComponent],
  imports: [
    CommonModule,
    CommanServicesModule
  ],
  exports:[
    ScreenComponent
  ]
})
export class ScreenModule { }
