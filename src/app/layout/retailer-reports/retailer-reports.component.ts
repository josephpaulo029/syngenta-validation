import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-retailer-reports',
  templateUrl: './retailer-reports.component.html',
  styleUrls: ['./retailer-reports.component.scss']
})
export class RetailerReportsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pendingActive: boolean;
  approvedActive: boolean;
  deniedActive: boolean;
  viewDataActive: boolean;
  viewData: any;
  retailersData: any;
  retailersData2: any;
  @Input() dashboard: boolean;

  constructor(private validationService: ValidationService) {}

  ngOnInit(): void {
    this.loadRetailersData();
    this.defaultnavStatus();
    this.pendingActive = true;
    if (this.dashboard == undefined) {
      this.dashboard = false;
    }
    // console.log(this.dashboard);
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  loadRetailersData() {
    Promise.resolve(this.validationService.getRetailersData())
      .then(data => {
        this.retailersData = data;
        this.dtTrigger.next();
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  selectData(info) {
    if (!this.dashboard) {
      console.log(info);
      this.defaultnavStatus();
      this.viewDataActive = true;
      this.viewData = info;
    }
  }

  approveTrans() {
    this.viewData.newStatus = 3;
    Promise.resolve(this.validationService.retailersValidate(this.viewData))
      .then(data => {
        // this.dtTrigger.next();
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  denyTrans() {
    this.viewData.newStatus = 4;
    Promise.resolve(this.validationService.retailersValidate(this.viewData))
      .then(data => {
        // this.dtTrigger.next();
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  clickPending() {
    this.defaultnavStatus();
    this.pendingActive = true;
  }

  clickApproved() {
    this.defaultnavStatus();
    this.approvedActive = true;
  }

  clickDenied() {
    this.defaultnavStatus();
    this.deniedActive = true;
  }

  goBack() {
    this.defaultnavStatus();
    this.pendingActive = true;
  }

  defaultnavStatus() {
    this.pendingActive = false;
    this.approvedActive = false;
    this.deniedActive = false;
    this.viewDataActive = false;
  }
}
