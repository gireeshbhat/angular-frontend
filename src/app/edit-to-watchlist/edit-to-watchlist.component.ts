import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminmoduleService } from 'app/_services';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { EditWatchlist, PhoneNumber, Npi, ProviderNo, License, Address } from './EditWatchlist';
import { MessageService } from 'primeng/api';
declare var $: any;

export interface WatchListModel {
  userid: number;
  data: EditWatchlist;
}

@Component({
  selector: 'app-edit-to-watchlist',
  templateUrl: './edit-to-watchlist.component.html',
  styleUrls: ['./edit-to-watchlist.component.css']
})
export class EditToWatchlistComponent extends DialogComponent<WatchListModel, boolean> implements OnInit, AfterViewInit, WatchListModel {
  data: EditWatchlist;
  userid: number;
  pageSize = 10;
  Columns: any = [
    { name: 'Title', displayName: 'Title', canSort: false, canfilter: false },
    {
      name: 'Category',
      displayName: 'Category',
      breakpoints: 'xxs,xs',
      anSort: false,
      canfilter: false
    },
    {
      name: 'Action',
      displayName: 'Action',
      breakpoints: 'xxs,xs,sm',
      canSort: false,
      canfilter: false
    },
    {
      name: 'AddedBy',
      displayName: 'Added By',
      breakpoints: 'xxs,xs,sm',
      canSort: false,
      canfilter: false
    },
    {
      name: 'FindingDate',
      displayName: 'Finding Date',
      breakpoints: 'xxs,xs,sm,md',
      canSort: false,
      canfilter: false
    },
    {
      name: 'Attachments',
      displayName: 'Attachments',
      canSort: false,
      canfilter: false,
      isCustomized: true
    },
    {
      name: 'ReasonCode',
      displayName: 'Reason Code',
      breakpoints: 'xxs,xs,sm,md,lg',
      canSort: false,
      canfilter: false
    },
    {
      name: 'FindingType',
      displayName: 'FindingType',
      breakpoints: 'xxs,xs,sm,md,lg',
      canSort: false,
      canfilter: false
    },
    {
      name: 'Description',
      displayName: 'Description',
      breakpoints: 'xxs,xs,sm,md,lg',
      canSort: false,
      canfilter: false
    },
    {
      name: 'RiskScore',
      displayName: 'Risk Score',
      breakpoints: 'xxs,xs,sm,md,lg',
      canSort: false,
      canfilter: false,
      isCustomized: true
    }
  ];

  watchlistModel: EditWatchlist;
  statuses = ['Other/Blank', 'Suspension', 'Under Appeal', 'Temporary Suspension', 'Active', 'Denied', 'Debarment'];

  result: boolean;

  showFinding = false;
  Finding_Title = '';
  Findings_Details = '';
  ReasonCode: string[] = [];
  PracticeType: string[] = [];
  Actions: string[] = [];
  Reason_Code = '';
  Practice_Type = '';
  sliderFrom = 0;
  sliderTo = 0;
  actionValue = '';
  rgb_Confirmed = '';
  FileCount = 0;
  childTableRowClass = 'footable-detail-row';
  childTableClass = 'footable-details';

  findingKey = 'finding';
  disableBtn: Boolean = false;
  FromDate_Text: string;
  showpassword = false;
  showcpassword = false;
  myDateValue: Date;
  maxDate: Date;

  complexForm: FormGroup;
  matching_passwords_group: FormGroup;

  todaysdate: any = new Date();
  RolesLocalStorage: any = [];
  searchtext: String = '';
  userlistLocalStorage: any;
  phone: PhoneNumber;
  npi: Npi;
  providerNo: ProviderNo;
  licenseNo: License;
  address: Address;

  constructor(
    dialogService: DialogService,
    private fb: FormBuilder,
    private adminmoduleService: AdminmoduleService,
  ) {
    super(dialogService);
    this.complexForm = fb.group({
      Finding_Title: ['', [Validators.required]],
      Practice_Type: ['', Validators.required],
      Reason_Code: ['', Validators.required],
      rgb_Confirmed: [''],
      Findings_Details: ['']
    });
  }

  ngOnInit() {
    this.myDateValue = new Date();
    this.maxDate = this.myDateValue;
    this.watchlistModel = this.data;
  }

  ngAfterViewInit(): void {
    this.watchlistModel.Address.push();
  }


  assignCopy() { }
  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
  }

  AddUser(value: any) {
    if (value.FirstName === '' || value.LastName === '') {
      return;
    }
  }

  onStatusChange(index: number): void {
    this.watchlistModel.Status = this.statuses[index];
  }

  addNewPhone(): void {
    this.phone = new PhoneNumber(null, '');
    this.watchlistModel.Watchlist_PhoneNumber.push(this.phone);
  }

  removePhone(index: number): void {
    this.watchlistModel.Watchlist_PhoneNumber.splice(index + 1, 1);
  }

  addNewNpi(): void {
    this.npi = new Npi(null, '');
    this.watchlistModel.Watchlist_NPI.push(this.npi);
  }

  removeNpi(index: number): void {
    this.watchlistModel.Watchlist_NPI.splice(index + 1, 1);
  }

  addNewProviderNumber(): void {
    this.providerNo = new ProviderNo(null, '');
    this.watchlistModel.Watchlist_ProviderNo.push(this.providerNo);
  }

  removeProviderNumber(index: number): void {
    this.watchlistModel.Watchlist_ProviderNo.splice(index + 1, 1);
  }

  addNewLicenseNo(): void {
    this.licenseNo = new License(null, '');
    this.watchlistModel.Watchlist_License.push(this.licenseNo);
  }

  removeLicenseNo(index: number): void {
    this.watchlistModel.Watchlist_License.splice(index + 1, 1);
  }

  addNewAddress(): void {
    this.address = new Address(null, '', '', '', '', '');
    this.watchlistModel.Address.push(this.address);
  }

  removeAddress(index: number): void {
    if (this.watchlistModel.Address.length > 1) {
      this.watchlistModel.Address.splice(index + 1, 1);
    } else {
      this.watchlistModel.Address[index] = this.address;
    }
  }

  formatZip(index: number) {
    if (this.watchlistModel.Address[index].ZipCode.length === 5) {
      this.watchlistModel.Address[index].ZipCode += '-';
    }
  }

  submitEdit() {
    this.adminmoduleService.updateWatchlist(this.watchlistModel).subscribe((data) => {
      this.cancel(true);
    });
    this.disableBtn = true;
  }

  trackByFn(index: any, item: any) {
    return item ? item.Id : undefined;
  }

  cancel(result: boolean) {
    this.result = result === undefined ? false : result;
    this.close();
  }

}
