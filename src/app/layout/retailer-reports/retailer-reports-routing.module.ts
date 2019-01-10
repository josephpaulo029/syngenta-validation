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
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RetailerReportsRoutingModule {}
