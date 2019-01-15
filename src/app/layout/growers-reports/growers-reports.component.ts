import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-growers-reports',
  templateUrl: './growers-reports.component.html',
  encapsulation: ViewEncapsulation.None,
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
  closeResult: string;
  modalHeader: any;
  @Input() dashboard: boolean;

  sampleData = [{
    "id": 3,
    "receipt_number": "test3",
    "receipt_photo": "https://www.qb-enterprise.com/syngenta/static/images/avatar5.png",
    "remarks": "",
    "products": [
      {
        "id": 1,
        "quantity": 14
      }
    ],
    "grower": 1,
    "created": "2019-01-12T06:29:54.228103Z",
    "modified": "2019-01-12T06:29:54.228322Z",
    "type": "claim",
    "points": 84,
    "status": 2
  }];

  constructor(private validationService: ValidationService, private modalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

  ngOnInit(): void {
    this.loadGrowersData();
    this.defaultnavStatus();
    this.pendingActive = true;
    if (this.dashboard == undefined) {
      this.dashboard = false;
    }
    // console.log(this.dashboard);
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  loadGrowersData() {
    Promise.resolve(this.validationService.getGrowersData(2))
      .then(data => {
        this.growersData = data;
        // this.growersData = this.sampleData;
        console.log(this.growersData);
        // console.log(this.sampleData);
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
      info.attachment = "/assets/images/attc.png";
      this.viewData = info;
    }
  }

  approve() {
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

  approveTrans(content, status) {
    status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'darkModal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  denyTrans(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'darkModal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  viewAttachment(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'transparent' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
