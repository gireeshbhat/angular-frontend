import { AddToWatchlistComponent } from './../add-to-watchlist/add-to-watchlist.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { MessageService } from 'primeng/api';
import { AdminmoduleService } from './../_services/index';
import { EditToWatchlistComponent } from 'app/edit-to-watchlist/edit-to-watchlist.component';
import { Subscription } from 'rxjs';
import { SearchRequest } from 'app/_models/search-request';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
  providers: [ MessageService ]
})
export class WatchListComponent implements OnInit {

  busy: Subscription;
  searchRequest: SearchRequest;
  flagMa = false;
  flagMe = false;
  MIN_ROWS_PER_PAGE = 6;
  MAX_ROWS_PER_PAGE = 10;
  resizeFlag = false;
  selectedUserID: number;
  totalRecordCount: number;
  totalPageCount: number;
  searchlistPerPage;
  pageSize ;
  currentSearchPage;
  childTableRowClass = 'footable-detail-row';
  childTableClass = 'footable-details';
  IsExpandedMode = false;
  globalFilterAssigned: any = [];
  ToDate_Text: string;
  rowExpanded = false;
  userlistLocalStorage: any = [];
  SelectedUsersList: any = [];
  selecteduser: any;
  searchtext = '';
  isPagination = false ;
  filteredItems: any;
  adminColumns: any = [
    {
      name: 'Name',
      displayName: 'NAME',
      breakpoints: 'xxs',
      canSort: true,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: true
    },

    {
      name: 'AkAName',
      displayName: 'AKA',
      breakpoints: 'xxs',
      canSort: true,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'Watchlist_License',
      displayName: 'Licence #',
      breakpoints: 'xxs',
      canSort: true,
      canfilter: true,
      dataType: 'number',
      autoFilterRequired: true
    },
    {
      name: 'Watchlist_NPI',
      displayName: 'NPI',
      breakpoints: 'xxs,xs,sm,md',
      canSort: true,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'Watchlist_ProviderNo',
      displayName: 'PROVIDER #',
      canSort: true,
      canfilter: true,
      filterType: 'Equal',
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'Watchlist_Address',
      displayName: 'ADDRESS',
      canSort: false,
      canfilter: true,
      filterType: 'Equal',
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'Notes',
      displayName: 'NOTES',
      canSort: false,
      canfilter: true,
      filterType: 'Equal',
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'DateAdded',
      displayName: 'DATE ADDED',
      breakpoints: 'xxs,xs,md',
      canSort: true,
      canfilter: true,
      filterType: 'Range',
      dataType: 'date',
      autoFilterRequired: false
    },
    {
      name: 'RequestBy',
      displayName: 'REQUEST BY',
      canSort: true,
      canfilter: true,
      filterType: 'Equal',
      dataType: 'string',
      autoFilterRequired: true
    },
    {
      name: 'Watchlist_PhoneNumber',
      displayName: 'PHONE #',
      breakpoints: 'xxs,xs,md',
      canSort: false,
      canfilter: true,
      dataType: 'string',
      autoFilterRequired: false,
      toggleOnExpandedMode: false
    },
    {
      name: 'Action',
      displayName: 'ACTION',
      breakpoints: 'xxs,xs,md',
      canSort: false,
      canfilter: false,
      dataType: 'string',
      autoFilterRequired: false,
      isCustomized: true,
      toggleOnExpandedMode: false
    }
  ];
  constructor(
    private adminmoduleService: AdminmoduleService,
    private dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.pageSize = 10;
    this.currentSearchPage = 0
  }

  getData(value: string, start: string , end: string) {
    this.searchRequest = new SearchRequest();
    this.searchRequest.searchText = value;
    this.searchRequest.start = start;
    this.searchRequest.end = end;
    this.busy = this.adminmoduleService.getChatData(this.searchRequest).subscribe(data => {
      const totalRecords: any[] = JSON.parse(JSON.stringify(data).replace(/\:null/gi, '\:\"\"'));
      if (totalRecords['source'] === null || totalRecords['source'].length === 0) {
        this.isPagination = false;
        this.filteredItems = [];
        this.messageService.clear();
        this.messageService.add({
          severity: 'info',
          summary: 'No Results Found',
        });
      } else {
        this.isPagination = true ;
        this.filteredItems =  totalRecords['source'];
        this.totalRecordCount = Number(totalRecords['total-record-count']);
        this.totalPageCount = Number(totalRecords['total-page-count']);
      }
    });
  }

  filterItem(value) {
    if ('' === value || value === null) {
      this.messageService.clear();
      this.messageService.add({
        severity: 'info',
        summary: 'Filter value can\'t be empty',
      });
      this.filteredItems = [];
    } else {
      this.getData(value, '0', this.pageSize);
    }
  }

  editUser() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      data: 'edituser',
      detail: 'Want to update record'
    });
  }

  deleteUser() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      data: 'deleteuser',
      detail: 'Want to delete record'
    });
  }

  adduser() {
    this.dialogService.addDialog(AddToWatchlistComponent, {}).subscribe(async (isConfirmed) => {
      if (isConfirmed === true) {
        await this.delay(7000);
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Watchlist added successfully',
        });
      }
    });
  }

  actionClicked(event) {
    this.selectedUserID = event.selectedItem.GateKeeperID;
    console.log('User: ' + this.selectedUserID);
    if (event.actionHit === 'Edit') {
      this.editUser();
    } else if (event.actionHit === 'Deactivate') {
      this.deleteUser();
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onConfirm(action) {
    if (action === 'edituser') {
      this.messageService.clear('c');
      this.adminmoduleService.getDataForUpd(this.selectedUserID).subscribe(obj => {
        this.dialogService.addDialog(EditToWatchlistComponent, {
          'userid': this.selectedUserID,
          'data': obj
        }).subscribe(async (isConfirmed) => {
          if (isConfirmed === true) {
            await this.delay(7000);
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: 'Watchlist updated successfully',
            });
            this.getData(this.searchtext, '0', this.MAX_ROWS_PER_PAGE + '');
          }
        });
      });
    } else {
      this.messageService.clear();
      this.adminmoduleService.deleteWatchlist(this.selectedUserID).subscribe(async (data) => {
        await this.delay(7000);
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Watchlist deleted successfully',
        });
        this.getData(this.searchtext, '0', this.MAX_ROWS_PER_PAGE + '');
      });
    }
  }

  onReject(action) {
    this.messageService.clear('c');
  }

  updatePaginationClick(event: any) {
    this.getData(this.searchtext , (event.newPage - 1) * this.pageSize + '',  this.pageSize + '')
  }

  onResize(event) {
    if (this.resizeFlag) {
      const innerHeight = window.innerHeight;
      if (innerHeight <= 786 && this.flagMe === false) {
        this.flagMe = true;
        this.flagMa = false;
        this.searchlistPerPage = this.MIN_ROWS_PER_PAGE;
      }

      if (innerHeight > 786 && this.flagMa === false) {
        this.flagMe = false;
        this.flagMa = true;
        this.searchlistPerPage = this.MAX_ROWS_PER_PAGE;
      }
    }
    this.resizeFlag = true;
  }
}
