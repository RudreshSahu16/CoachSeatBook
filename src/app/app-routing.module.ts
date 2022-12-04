import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenComponent } from './screen/screen.component';

const routes: Routes = [
  {path:'',component:ScreenComponent},
  {path:'checkCoachSeats',loadChildren:"./coachseatbooking/coachseatbooking.module#CoachseatbookingModule"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
