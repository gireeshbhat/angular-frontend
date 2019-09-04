import { QuickSearchRequest } from './../_models/quick-search-request';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminmoduleService } from 'app/_services';

import * as _ from '../../assets/js/quick-event-invoker.js';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.css']
})
export class QuickSearchComponent implements OnInit {

  request: QuickSearchRequest;
  tableData: any;
  searchText: string;
  totalRecords: number;
  timeTaken: number;
  currentPage: number;
  searchMessage: string;

  type: string;

  prevClass: string;
  nextClass: string;

  constructor(
    private route: ActivatedRoute,
    private adminmoduleService: AdminmoduleService) {
  }

  ngOnInit() {
    this.request = new QuickSearchRequest();
    this.route
      .queryParams
      .subscribe(params => {
        this.request.query = params['query'];
        this.searchText = params['searchText'];
        this.request.status = params['status'];
        this.request.risk = params['risk'];
      });
    this.currentPage = 1;
    this.searchMessage = '';

    this.request.searchText = this.searchText;
    this.request.start = 0;
    this.request.end = 10;

    this.prevClass = 'disabled';
    this.nextClass = 'disabled';

    this.adminmoduleService.getQuickSeatchData(this.request).subscribe(data => {
      this.tableData = data['data'];
      this.currentPage = 1;
      if (data['data'].length === 10) {
        this.nextClass = 'enabled';
      }
      if (data['data'] === null || data['data'].length === 0) {
        this.searchMessage = 'No record found for the entered keyword'
        this.currentPage = 0;
      }
      this.totalRecords = data['total-records'];
      this.timeTaken = data['time-taken'];
    });
  }

  nextPage() {
    if (this.nextClass !== 'disabled') {
      this.prevClass = 'enabled';
      this.request.start = this.currentPage * 10;
      this.adminmoduleService.getQuickSeatchData(this.request).subscribe(data => {
        this.tableData = data['data'];
        this.timeTaken = data['time-taken'];
      });
      if ((this.totalRecords / 10) < ++this.currentPage) {
        this.nextClass = 'disabled';
      }
    }
  }

  previousPage() {
    if (this.prevClass !== 'disabled') {
      this.nextClass = 'enabled';
      this.request.start = this.request.start - 10;

      this.adminmoduleService.getQuickSeatchData(this.request).subscribe(data => {
        this.tableData = data['data'];
        this.timeTaken = data['time-taken'];
      });
      if (--this.currentPage === 1) {
        this.prevClass = 'disabled';
      }
    }
  }

  applicationNumberClick(appNo: any) {
    _.sendNsCmd('OpenCaseDetails', 'quickSearchAltID1', appNo);
  }

  accountNumberClick(accountNo: any) {
    _.sendNsCmd('OpenAccountDetails', 'quickSearchAltID2', accountNo);
  }

  alertNumberClick(alertNo: any) {
    console.log(alertNo);
    _.sendNsCmd('OpenAlertDetails', 'quickSearchAltID', alertNo);
  }

}
