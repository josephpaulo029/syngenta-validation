import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-growers-reports',
  templateUrl: './growers-reports.component.html',
  styleUrls: ['./growers-reports.component.scss']
})
export class GrowersReportsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pendingActive: boolean;
  approvedActive: boolean;
  deniedActive: boolean;
  viewDataActive: boolean;
  viewData: any;
  growersData: any;
  growersData2: any;
  filteredData: any;
  @Input() dashboard: boolean;

  constructor(private validationService: ValidationService) {}

  ngOnInit(): void {
    this.loadGrowersData();
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

  loadGrowersData() {
    Promise.resolve(this.validationService.getGrowersData())
      .then(data => {
        this.growersData = data;
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
    Promise.resolve(this.validationService.growersValidate(this.viewData))
      .then(data => {
        // this.dtTrigger.next();
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  denyTrans() {}

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
