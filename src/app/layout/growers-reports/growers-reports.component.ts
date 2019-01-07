import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isatty } from 'tty';

@Component({
  selector: 'app-growers-reports',
  templateUrl: './growers-reports.component.html',
  styleUrls: ['./growers-reports.component.scss']
})
export class GrowersReportsComponent implements OnInit {
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
