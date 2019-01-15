import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { RetailerReportsRoutingModule } from './retailer-reports-routing.module';
import { RetailerReportsComponent } from './retailer-reports.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [CommonModule, NgbModule, NgbCarouselModule, NgbAlertModule, RetailerReportsRoutingModule, DataTablesModule],
  declarations: [RetailerReportsComponent],
  exports: [RetailerReportsComponent]
})
export class RetailerReportsModule { }
