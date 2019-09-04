import { DatePipe } from '@angular/common';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserList } from 'app/_models/UserList';
import { AdminmoduleService } from 'app/_services';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AddWatchlist, Address } from './AddWatchlist';

declare var $: any;

// tslint:disable-next-line:no-empty-interface
export interface ConfirmModel { }

@Component({
  selector: 'app-add-to-watchlist',
  templateUrl: './add-to-watchlist.component.html',
  styleUrls: ['./add-to-watchlist.component.css']
})
export class AddToWatchlistComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, OnChanges, ConfirmModel {


  pageSize = 10;
  watchlistModel: AddWatchlist = null;
  statuses = ['', 'Suspension', 'Under Appeal', 'Temporary Suspension', 'Active', 'Denied', 'Debarment', 'Other/Blank'];

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
  FromDate_Text: string;
  showpassword = false;
  showcpassword = false;
  myDateValue: Date;
  maxDate: Date;
  disableBtn: Boolean = false;
  complexForm: FormGroup;
  matching_passwords_group: FormGroup;
  adduserdata: UserList = new UserList();
  userData: UserList[];
  todaysdate: any = new Date();
  RolesLocalStorage: any = [];
  address: Address;

  constructor(
    dialogService: DialogService,
    private fb: FormBuilder,
    private adminmoduleService: AdminmoduleService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(dialogService);
    this.complexForm = fb.group({
      Finding_Title: ['', [Validators.required]],
      Practice_Type: ['', Validators.required],
      Reason_Code: ['', Validators.required],
      rgb_Confirmed: [''],
      Findings_Details: ['']
    });
    this.address = new Address('', '', '', '', '');
    this.watchlistModel = new AddWatchlist('', '', '', '', '', '', '', '', '', true, [''], [''], [''], [''], [this.address]);
  }

  ngOnInit() {
    this.myDateValue = new Date();
    this.maxDate = this.myDateValue;
    this.watchlistModel.Address.push(new Address('', '', '', '', ''));
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  AddUser(value: any) {
    if (value.FirstName === '' || value.LastName === '') {
      return;
    }
    this.ClearAll();
  }

  ClearAll() { }
  ClearallConfirm() {
    this.complexForm.reset();
    this.router.navigate(['/admin/userlist']);
  }
  onConfirm() {
    this.ClearallConfirm();
  }
  onReject() { }

  trackByFn(index: any, item: any) {
    return index;
  }

  onTypeChanged(type: string): void {
    this.watchlistModel.IsIndividual = ('ind' === type) ? true : false;
  }

  onStatusChange(index: number): void {
    this.watchlistModel.Status = this.statuses[index];
  }

  addNewPhone(): void {
    this.watchlistModel.Watchlist_PhoneNumber.push('');
  }

  removePhone(index: number): void {
    this.watchlistModel.Watchlist_PhoneNumber.splice(index + 1, 1);
  }

  addNewNpi(): void {
    this.watchlistModel.Watchlist_NPI.push(' ');
  }

  removeNpi(index: number): void {
    this.watchlistModel.Watchlist_NPI.splice(index + 1, 1);
  }

  addNewProviderNumber(): void {
    this.watchlistModel.Watchlist_ProviderNo.push('');
  }

  removeProviderNumber(index: number): void {
    this.watchlistModel.Watchlist_ProviderNo.splice(index + 1, 1);
  }

  addNewLicenseNo(): void {
    this.watchlistModel.Watchlist_License.push('');
  }

  removeLicenseNo(index: number): void {
    this.watchlistModel.Watchlist_License.splice(index + 1, 1);
  }

  addNewAddress(): void {
    this.address = new Address('', '', '', '', '');
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

  onSubmit(): void {
    this.adminmoduleService.saveWatchlist(this.watchlistModel).subscribe((data) => {
      this.cancel(true);
    });
    this.disableBtn = true;
  }

  cancel(result: boolean) {
    this.result = result === undefined ? false : result;
    this.close();
  }
}
