import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RetailerReportsComponent } from './retailer-reports.component';

const routes: Routes = [
  {
    path: '',
    component: RetailerReportsComponent
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
export class RetailerReportsRoutingModule {}
