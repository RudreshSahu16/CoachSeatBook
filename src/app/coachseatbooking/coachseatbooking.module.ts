import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachseatbookingComponent } from './coachseatbooking.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

const Route : Routes=[
  {path:'',component:CoachseatbookingComponent},
]


@NgModule({
  declarations: [CoachseatbookingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Route),
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports:[RouterModule]
})
export class CoachseatbookingModule { }
