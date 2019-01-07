import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retailer-reports',
  templateUrl: './retailer-reports.component.html',
  styleUrls: ['./retailer-reports.component.scss']
})
export class RetailerReportsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  pendingActive: boolean;
  approvedActive: boolean;
  deniedActive: boolean;

  constructor() {}

  ngOnInit(): void {
    this.defaultnavStatus();
    this.pendingActive = true;

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
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

  defaultnavStatus() {
    this.pendingActive = false;
    this.approvedActive = false;
    this.deniedActive = false;
  }
}
