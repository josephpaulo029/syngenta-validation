import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GrowersReportsComponent } from './growers-reports.component';

const routes: Routes = [
  {
    path: '',
    component: GrowersReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class GrowersReportsRoutingModule {}
