import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { GrowersReportsRoutingModule } from './growers-reports-routing.module';
import { GrowersReportsComponent } from './growers-reports.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [CommonModule, NgbCarouselModule, NgbAlertModule, GrowersReportsRoutingModule, DataTablesModule],
  declarations: [GrowersReportsComponent]
})
export class GrowersReportsModule {}
