import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-retailer-reports',
  templateUrl: './retailer-reports.component.html',
  encapsulation: ViewEncapsulation.None,
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
  closeResult: string;
  modalHeader: any;
  @Input() dashboard: boolean;

  constructor(private validationService: ValidationService, private modalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

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
    Promise.resolve(this.validationService.getRetailersData(2))
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
      info.attachment = "/assets/images/attc.png"
      this.viewData = info;
    }
  }

  approve() {
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
