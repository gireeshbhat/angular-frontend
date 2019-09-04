import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PagerService } from 'app/_services/pager.service';
import { breakpointsProvider, BreakpointsService, BreakpointEvent } from 'app/_services/breakpoints.service';

declare var $: any;
declare var moment: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.css'],
  providers: [breakpointsProvider(), PagerService],
  animations: [trigger('easeInOut',
    [state('void', style({ height: '0px', opacity: 0 })),
    state('*', style({ height: '*', opacity: 1 })),
    transition('void <=> *', animate('0.5s ease'))
    ]
  )]
})
export class NgTableComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  @Input() checkbox: boolean;
  @Input() icon: boolean;
  @Input() headers: any;
  @Input() data: any;
  @Input() needActionBox: boolean;
  @Input() pageSize: number;
  @Input() total: number;
  @Input() perPage: number;
  @Input() pageSizeChart: any;
  @Input() dataPaging: boolean;
  @Input() showReviewerMapping: boolean;
  @Input() updateCheckboxForARecord: any;
  @Input() disableIcon: boolean
  @Input() selectedIndex: number;
  @Input() globalFilter: any[] = [];
  @Input() IsMailBoxTableTD: boolean;
  @Input() childTableClass: string;
  @Input() childRowClass: string;
  @Input() key: string;
  @Input() anchorColumnNames: string;
  @Input() IsExpandedMode: boolean;
  @Input() resetPagination: string;
  @Input() getInternalheader: any = [];
  @Input() page: number;
  @Input() queueType: string;
  @Input() filterTable: any;
  @Input() disabledCheckboxColumn = false;
  @Input() provider360Data: any;
  @Output() update = new EventEmitter<any>();
  @Output() selectedRow = new EventEmitter<any>();
  @Output() updatePagination = new EventEmitter<any>();
  @Output() updateSort = new EventEmitter<any>();
  @Output() CheckboxChange = new EventEmitter<any>();
  @Output() plusExpande = new EventEmitter<any>();
  @Output() anchorClicked = new EventEmitter<any>();
  @Output() openDocument = new EventEmitter<any>();
  @Output() Status_Change = new EventEmitter<any>();
  @Output() sentInternalheader = new EventEmitter<any>();
  @Output() sentInternalFilters = new EventEmitter<any>();
  @Output() rowAndPositionSelected = new EventEmitter<any>();
  @Output() iconClicked = new EventEmitter<any>();
  @Output() seledtedDuplCase = new EventEmitter<any>();
  @Input() loaderSwitch: boolean;
  @Input() customTableClass: boolean;
  @Input() highlightKeyword = '';
  @Input() isDesc = false;
  @Input() column = '';
  @Input() applicationData: any;
  @Input() relatedProfile: boolean;
  @Input() disableCheckBox: boolean;
  @Input() appHistory: boolean;
  @Output() closeOnCLick = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<any>();
  commentData: any[] = [];
  objComments: Comment[];
  appData: any;
  disable: boolean;
  userID: any;
  listPerPage: number;
  InternalChildRowClass: string;
  InternalChildTableClass: string;
  internalLoaderSwitch: boolean;
  isExpandable = false;
  viewPort = '';
  internalGlobalFilter: any;
  internalHeaders: any;
  internalData: any;
  internalDataWithoutFilter: any;
  internalNeedActionBox: boolean;
  internalPageSize: number;
  internalPageSizeChart: any;
  internalDataPaging = false;
  InternalShowReviewerMapping: boolean;
  InternalIsMailBoxTableTD: boolean;
  InternalKey: string;
  InternalSelectedIndex = 0;
  internalAnchorColumnNames = '';
  internalIsExpandedMode = false;
  internalresetPagination = '';
  rowExpandIndex: number = -1;
  colFilterIndex: number = -1;
  showActionBox = false;
  offsetTop: number;
  offsetLeft: number;
  toppopup = true;
  rowForActionBox: any;
  pager: any = {};
  pagedItems: any[] = [];
  filtersActived: any[] = [];
  rowSelect: Subscription = new Subscription();
  pageSelect: Subscription = new Subscription();
  subscriptionResetAllIconFilters: Subscription;
  rolesSubscription: Subscription = new Subscription();
  loader: any[] = [];
  loaderColor = 'red';
  loaderExecute = true;
  rowNumber: number;
  wfAction: Subscription = new Subscription();
  checkBox: boolean;
  showIcon: boolean;
  private getSelectedInSubscribe: Subscription;
  private changesSubscribe: Subscription;
  private getFilterSubscribe: Subscription;
  private ShowCheckBoxTeamSubscribe: Subscription;
  private controlFilterTablesSubscribe: Subscription;
  refresh = false;
  selectedRole: any;
  disableDuplicateIcon: boolean;
  selectedTab: any;
  provider360: any;
  topposition: any;
  leftposition: any;
  currentItem: any;

  constructor(private breakpointsService: BreakpointsService,
    private pagerService: PagerService
  ) {

    this.changesSubscribe = this.breakpointsService.changes.subscribe((event: BreakpointEvent) => {
      this.viewPort = event.name;
      this.isExpandable = this.Expandable();
      this.setPage(1);
    });
  }

  ngOnInit() {
    this.isExpandable = this.Expandable();
    if (null !== this.getInternalheader && undefined !== this.getInternalheader && this.getInternalheader.length > 0) {
      this.filtersActived = this.getInternalheader;
      this.getInternalheader.map(
        pos => {
          this.headers[pos].filterClass = 'filter-active';
        }
      );
    }
  }

  desactiveFilter(event) {
    this.headers[event].filterClass = '';
    this.colFilterIndex = -1;
    for (let i = 0; i < this.filtersActived.length; i++) {
      if (this.filtersActived[i] === event) {
        this.filtersActived.splice(i, 1)
      }
    }

    for (let i = 0; i < this.filtersActived.length; i++) {
      if (this.filtersActived[i] === event) {
        this.filtersActived.splice(i, 1)
      }
    }
  }

  desactiveAllFilters() {
    this.getInternalheader = [];
    this.filterTable = '';
    this.filtersActived = [];
    if (this.headers) {
      for (let i = 0; i < this.headers.length; i++) {
        this.headers[i].filterClass = '';
        this.colFilterIndex = -1;
      }
    }
  }

  clickFilterIcon(i) {
    this.colFilterIndex = this.colFilterIndex === i ? -1 : i;
    if (i !== -1) {
      // this.caselistService.controlFilterReviwerList.next(true);
      // this.caselistService.controlFilterAdvancedSearch.next(true);
    }
  }

  ngOnDestroy() {
    // this.dhloader.stopLoader();
    this.ShowExpandMinus();
    this.sentInternalheader.emit(this.filtersActived);
    this.sentInternalFilters.emit(this.filterTable);
    this.pageSelect.unsubscribe();
    this.rowSelect.unsubscribe();
    this.wfAction.unsubscribe();
    this.getSelectedInSubscribe.unsubscribe();
    this.rolesSubscription.unsubscribe();
    this.subscriptionResetAllIconFilters.unsubscribe();
    this.changesSubscribe.unsubscribe();
    if (this.getFilterSubscribe) {
      this.getFilterSubscribe.unsubscribe();
    }
    this.ShowCheckBoxTeamSubscribe.unsubscribe();
    this.controlFilterTablesSubscribe.unsubscribe();
  }

  filterAcum(event) {
    this.filterTable = event;
  }

  ngOnChanges(changes: any): void {
    this.ShowExpandMinus();
    let setPageRequired = false;
    let updateEmitRequired = false;
    let doFilterRequired = false;

    if (changes !== undefined && changes.childTableClass !== undefined && changes.childTableClass.currentValue) {
      this.InternalChildTableClass = changes.childTableClass.currentValue;
    }
    if (changes !== undefined && changes.childRowClass !== undefined && changes.childRowClass.currentValue) {
      this.InternalChildRowClass = changes.childRowClass.currentValue;
    }

    if (changes !== undefined && changes.anchorColumnNames !== undefined && changes.anchorColumnNames.currentValue) {
      this.internalAnchorColumnNames = changes.anchorColumnNames.currentValue;
    }
    if (changes !== undefined && changes.selectedIndex !== undefined && changes.selectedIndex.currentValue >= 0) {
      this.InternalSelectedIndex = changes.selectedIndex.currentValue;
    }
    if (changes !== undefined && changes.dataPaging === undefined && changes.total !== undefined) {
      this.page = 1;
    }
    if (changes !== undefined && changes.dataPaging !== undefined && changes.dataPaging.currentValue) {
      this.internalDataPaging = changes.dataPaging.currentValue;
      this.page = 1;
    }
    if (changes !== undefined && changes.needActionBox !== undefined && changes.needActionBox.currentValue) {
      this.internalNeedActionBox = changes.needActionBox.currentValue;
    }
    if (changes !== undefined && changes.disableIcon !== undefined) {
      this.disableDuplicateIcon = changes.disableIcon.currentValue;
    }
    if (changes !== undefined && changes.loaderSwitch !== undefined) {
      this.internalLoaderSwitch = changes.loaderSwitch.currentValue;
      if (this.internalLoaderSwitch === false) {
        // this.loaderExecute = this.dhloader.completeLoader();
      }
    }
    if (changes !== undefined && changes.disableCheckBox !== undefined) {
      this.disable = changes.disableCheckBox.currentValue;
    }
    if (changes !== undefined && changes.applicationData !== undefined) {
      this.appData = changes.applicationData.currentValue;
    }

    if (changes !== undefined && changes.icon !== undefined) {
      this.showIcon = changes.icon.currentValue;
    }

    if (changes !== undefined && changes.checkbox !== undefined) {
      this.checkBox = changes.checkbox.currentValue;
    }
    if (changes !== undefined && changes.headers !== undefined && changes.headers.currentValue) {
      this.internalHeaders = changes.headers.currentValue;
      this.DoToggleExpandedMode();
      this.isExpandable = this.Expandable();
      this.fillAutoFilterSource();
    }

    if (changes !== undefined && changes.provider360Data !== undefined && changes.provider360Data.currentValue) {
      this.provider360 = changes.provider360Data.currentValue;
    }

    if (changes !== undefined && changes.resetPagination !== undefined) {
      this.internalresetPagination = changes.resetPagination.currentValue;
      if (this.internalresetPagination !== undefined) {
        if (this.internalresetPagination.startsWith('reset')) {
          this.UpdatePagination(1);
        }
      }
    }

    if (changes !== undefined && changes.IsExpandedMode !== undefined) {
      this.internalIsExpandedMode = changes.IsExpandedMode.currentValue;
      this.DoToggleExpandedMode();
      this.isExpandable = this.Expandable();
    }
    if (changes !== undefined && changes.data !== undefined && changes.data.currentValue) {
      const data = changes.data.currentValue;
      let i = 1;
      for (const v of data) {
        v.globalRowIndex = i;
        i = i + 1;
      }
      this.internalData = changes.data.currentValue;
      if (changes.data.currentValue instanceof Array) {
        this.pagedItems = changes.data.currentValue;
      }
      this.internalDataWithoutFilter = changes.data.currentValue;
      setPageRequired = true;
      updateEmitRequired = true;
      doFilterRequired = true;
      this.fillAutoFilterSource();
    }
    if (changes !== undefined && changes.internalData !== undefined && changes.internalData.currentValue) {
      updateEmitRequired = true;
    }
    if (changes !== undefined && changes.pageSize !== undefined && changes.pageSize.currentValue) {
      this.listPerPage = changes.pageSize.currentValue;
      this.loader = [];
      for (let i = 0; i < this.listPerPage; i++) {
        this.loader.push('');
      }

      this.pager = this.pagerService.getPager(this.total, 1, changes.pageSize.currentValue);
      this.internalPageSize = Math.floor(changes.pageSize.currentValue);
      setPageRequired = true;
    }
    if (changes !== undefined && changes.pageSizeChart !== undefined && changes.pageSizeChart.currentValue) {
      this.internalPageSizeChart = changes.pageSizeChart.currentValue;
      setPageRequired = true;
    }
    if (changes !== undefined && changes.updateCheckboxForARecord !== undefined && changes.updateCheckboxForARecord.currentValue) {
      const record: any = changes.updateCheckboxForARecord.currentValue;
      if (record !== undefined && record !== null && record.property !== undefined && record.property !== null) {
        const i: number = this.internalDataWithoutFilter.findIndex(x => x[record.property] === record.propertyValue);
        if (i > -1) {
          this.internalDataWithoutFilter[i].IsChecked = record.IsChecked;
        }
      }
    }
    if (changes !== undefined && changes.showReviewerMapping !== undefined) {
      this.InternalShowReviewerMapping = changes.showReviewerMapping.currentValue;
    }

    if (changes !== undefined && changes.IsMailBoxTableTD !== undefined) {
      this.InternalIsMailBoxTableTD = changes.IsMailBoxTableTD.currentValue;
    }

    if (changes !== undefined && changes.globalFilter !== undefined) {
      const filters: any = changes.globalFilter.currentValue;
      for (const v of filters) {
        // tslint:disable-next-line:no-shadowed-variable
        const i: number = this.internalHeaders.findIndex(i => i.name === v.colName);
        if (i > -1) {
          this.internalHeaders[i].filterClass = '';
          // Riskscore range filter
          if (this.internalHeaders[i].dataType === 'number'
            && this.internalHeaders[i].filterType === 'Range'
            && v.filterMinValue !== undefined) {
            this.internalHeaders[i].filterMinValue = v.filterMinValue;
          }
          if (this.internalHeaders[i].dataType === 'number'
            && this.internalHeaders[i].filterType === 'Range'
            && v.filterMaxValue !== undefined) {
            this.internalHeaders[i].filterMaxValue = v.filterMaxValue;
          }

          // Date range filter
          if (this.internalHeaders[i].dataType === 'date'
            && this.internalHeaders[i].filterType === 'Range'
            && v.filterMinValue !== undefined) {
            this.internalHeaders[i].filterMinValue = v.filterMinValue;
          }
          if (this.internalHeaders[i].dataType === 'date'
            && this.internalHeaders[i].filterType === 'Range'
            && v.filterMaxValue !== undefined) {
            this.internalHeaders[i].filterMaxValue = v.filterMaxValue;
          }


          this.internalHeaders[i].filterValue = v.filterValue;
        }
      }
      updateEmitRequired = false;
      this.doFilter();

      this.internalGlobalFilter = changes.globalFilter.currentValue;
      doFilterRequired = true;
    }

    if (updateEmitRequired) {
      this.update.emit({
        totalRows: this.internalData.length
      });
    }

    if (setPageRequired && this.pager.totalItems <= 0) {

      const page: number = this.pager.currentPage;
      this.pager = this.pagerService.getPager(this.total, page, this.listPerPage);
      if (this.pager.totalItems > 0) {
        this.pager.currentPage = 1;
      }
    }
    if (doFilterRequired) {
      this.setGlobalFilter();
      if (null !== this.getInternalheader && undefined !== this.getInternalheader && this.getInternalheader.length > 0) {
        this.filtersActived = this.getInternalheader;
        this.getInternalheader.map(
          pos => {
            this.headers[pos].filterClass = 'filter-active';
          }
        );
      }
      // tslint:disable-next-line:one-line
      else {
        this.filtersActived = [];
      }

      if (this.headers) {
        for (let i = 0; i < this.headers.length; i++) {
          this.headers[i].filterClass = '';
        }
      }
      this.filtersActived.map(
        pos => {
          this.headers[pos].filterClass = 'filter-active';
        }
      );
    }

    if (changes !== undefined && changes.key !== undefined && changes.key.currentValue) {
      this.InternalKey = changes.key.currentValue;
    }
    /*
    * if this.page !==0, set pagination the current selected page saved, otherwise set pagination the first page
    * */
    if (this.page !== 0) {
      this.pager = this.pagerService.getPager(this.total, this.page, this.listPerPage);
    } else {
      this.pager = this.pagerService.getPager(this.total, 1, this.listPerPage);
    }
  }

  ngAfterContentInit() {
    if (this.loaderExecute) {
      // this.dhloader.start();
    }
  }

  DoToggleExpandedMode() {
    if (this.internalHeaders === null || this.internalHeaders === undefined) {
      return;
    }
    for (const v of this.internalHeaders) {
      if (v.toggleOnExpandedMode) {
        if (this.internalIsExpandedMode) {
          if (v.breakpoints.slice(-3) === ',lg') {
            v.breakpoints = v.breakpoints.slice(0, -3);
          }
        } else {
          if (v.breakpoints.slice(-3) !== ',lg') {
            v.breakpoints = v.breakpoints + ',lg';
          }
        }
      }
    }
  }

  setGlobalFilter() {
    if (
      this.internalHeaders === null || this.internalHeaders === undefined
      || this.internalGlobalFilter === null || this.internalGlobalFilter === undefined) {
      return;
    }

    const filters = this.internalGlobalFilter;
    for (const v of filters) {
      // tslint:disable-next-line:no-shadowed-variable
      const i: number = this.internalHeaders.findIndex(i => i.name === v.colName);

      if (i > -1) {
        this.internalHeaders[i].filterClass = '';
        // Riskscore range filter
        if (this.internalHeaders[i].dataType === 'number'
          && this.internalHeaders[i].filterType === 'Range'
          && v.filterMinValue !== undefined) {
          this.internalHeaders[i].filterMinValue = v.filterMinValue;
        }
        if (this.internalHeaders[i].dataType === 'number'
          && this.internalHeaders[i].filterType === 'Range'
          && v.filterMaxValue !== undefined) {
          this.internalHeaders[i].filterMaxValue = v.filterMaxValue;
        }

        // Date range filter
        if (this.internalHeaders[i].dataType === 'date'
          && this.internalHeaders[i].filterType === 'Range'
          && v.filterMinValue !== undefined) {
          this.internalHeaders[i].filterMinValue = v.filterMinValue;
        }
        if (this.internalHeaders[i].dataType === 'date'
          && this.internalHeaders[i].filterType === 'Range'
          && v.filterMaxValue !== undefined) {
          this.internalHeaders[i].filterMaxValue = v.filterMaxValue;
        }

        this.internalHeaders[i].filterValue = v.filterValue;
      }
    }
    // this.doFilter();
  }

  checkAnchorColumn(name: string) {
    if (this.internalAnchorColumnNames.split(',').indexOf(name) !== -1) {
      return true;
    }
    // tslint:disable-next-line:one-line
    else {
      return false;
    }
  }

  AnchorColumn_Clicked(item: any, index: number, colName: string, e: any) {
    let isHasClass = false;
    this.InternalSelectedIndex = index;
    if (e.target.classList.contains('collapsable_btn') || e.target.classList.contains('control__indicator')
      || e.target.classList.contains('percent') || e.target.classList.contains('risk_score_pop')) {
      isHasClass = true;
    }

    this.anchorClicked.emit({
      selectedItem: item,
      selectedIndex: index,
      isShowRHS: isHasClass,
      columnName: colName,
      event: event
    });

    if (this.appHistory) {
      this.closeOnCLick.emit({
        isClose: true
      });
      // this.navigateFromAppHistory(item.ApplicationNumber);
    }
  }

  openDocumentViewer(item: any) {
    this.openDocument.emit({
      selectedItem: item
    });
  }

  //   openAttachmentsDocumentViewer(item: string, dmsid: string, event: any) {
  //     const prizOption = new PrizmOptions(item, dmsid);
  //     this.dialogService.addDialog(DocumentViewerComponent, {
  //       title: 'Document viewer',
  //       prizOption: prizOption
  //     });
  //     this.openDocument.emit({
  //       selectedItem: item
  //     });
  //   }

  openGlobalSearchDocumentViewer(item: string, dmsid: string, caseId: string) {
    ///  const prizOption = new PrizmOptions(item, dmsid);
    //  this.dialogService.addDialog(DocumentViewerComponent, {
    //   title: 'Document viewer',
    //   prizOption: prizOption,
    //   moduleType: 'GlobalSearchAttachments',
    //   globalSearchCaseID: caseId
    // });
    this.openDocument.emit({
      selectedItem: item
    });
  }

  fillAutoFilterSource() {
    if (this.internalHeaders === undefined || this.internalHeaders === null) {
      return;
    }
    for (const v of this.internalHeaders) {
      v.autoCompleteDataSource = [];
      const autoComplete: Array<string> = [];

      if (v.autoFilterRequired !== undefined && v.autoFilterRequired !== null && v.autoFilterRequired && this.internalData !== undefined) {
        for (const d of this.internalData) {
          if (autoComplete.findIndex(x => x === d[v.name]) === -1) {
            autoComplete.push(d[v.name]);
          }
        }
      }
      v.autoCompleteDataSource = autoComplete;
    }
  }

  ShowExpand(index: number) {
    this.rowExpandIndex = index;
    this.showActionBox = false;

    this.plusExpande.emit({ rowExpanded: true });
  }

  ShowExpandMinus() {
    this.rowExpandIndex = -1;
    this.showActionBox = false;

    this.plusExpande.emit({ rowExpanded: false });
  }

  Expandable() {
    if (this.internalHeaders === undefined || this.internalHeaders === null) {
      return false;
    }
    for (const v of this.internalHeaders) {
      if (v.breakpoints !== undefined && v.breakpoints !== null && v.breakpoints !== '') {
        if (v.breakpoints.split(',').findIndex(item => item === this.viewPort) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  ColumnVisibility(breakpoints: string) {
    // tslint:disable-next-line:curly
    if (breakpoints === undefined || breakpoints === null || breakpoints === '')
      return true;

    const array = breakpoints.split(',');
    return array.findIndex(item => item === this.viewPort) === -1 ? true : false;
  }

  setPage(page: number) {
    if (!this.internalDataPaging || this.internalData === undefined || this.internalData === null) {
      return;
    }

    if (!this.internalDataPaging) {
      this.pagedItems = this.internalData
      return;
    }

    if (page < 1) {
      page = 1;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.total, page, this.listPerPage);
    // prevent click next page
    if (this.pager.endPage < this.pager.currentPage) {
      this.pager.currentPage = this.pager.endPage;
      if (this.internalData.length === 0) {
        this.pagedItems = this.internalData.slice();
      }
      return;
    }
    // get current page of items
    this.pagedItems = this.internalData.slice(0, this.pageSize);

    this.rowExpandIndex = -1;

    // ResizingRightCase
    this.plusExpande.emit({ rowExpanded: false });
  }

  OnSearchFinish(a: any, col: any) {
    // tslint:disable-next-line:no-shadowed-variable
    const i: number = this.internalHeaders.findIndex(i => i.name === col.name);
    this.internalHeaders[i].filterMinValue = a.from;
    this.internalHeaders[i].filterMaxValue = a.to;
  }

  // Change sort function to this:
  sort(item: any) {
    const property: string = item.name;
    const canSort: boolean = item.canSort;
    const dataType: string = item.dataType;
    this.isDesc = !this.isDesc;
    this.column = item.name;
    const direction = this.isDesc ? 1 : -1;

    if (dataType !== 'date') {
      this.internalData.sort(function (a, b) {
        let data1 = a[property];
        let data2 = b[property];
        if (data1 === null) {
          data1 = '';
        }
        if (data2 === null) {
          data2 = '';
        }
        if (data1 < data2) {
          return -1 * direction;
        } else if (data1 > data2) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
    } else {
      this.internalData.sort(function (a, b) {
        if (moment(a[property]).diff(moment(b[property]), 'days') < 0) {
          return -1 * direction;
        } else if (moment(a[property]).diff(moment(b[property]), 'days') > 0) {
          return 1 * direction;
        } else {
          return 0;
        }
      });
    }
    this.setPage(this.pager.currentPage);
  }

  showFilterColumn(columnIndex) {
    if (columnIndex !== -1) {
      this.headers[columnIndex].filterClass = 'filter-active';
      this.colFilterIndex = -1;
      this.filtersActived.push(columnIndex);
      this.getInternalheader.push(columnIndex);
    }
  }

  closeFilter() {
    this.colFilterIndex = -1;
  }

  // Filter
  doFilter() {

    if (this.internalDataWithoutFilter === undefined || this.internalDataWithoutFilter === null) {
      return;
    }

    const headers: any = this.internalHeaders;
    if (this.internalDataWithoutFilter.filter !== undefined) {
      this.internalData = this.internalDataWithoutFilter.filter(function (item) {
        let matchesAll = true;
        for (let i = 0; i < headers.length; i++) {
          // debugger;
          if (!headers[i].canfilter) {
            continue;
          }
          const validProperty: boolean = item.hasOwnProperty(headers[i].name);
          if (!validProperty) {
            continue;
          }
          const isString = (headers[i].dataType === undefined || headers[i].dataType === '' || headers[i].dataType === 'string');
          const isNumber = headers[i].dataType === 'number';
          const isDate = headers[i].dataType === 'date';
          const isContains = (
            headers[i].filterType === undefined
            || headers[i].filterType === ''
            || headers[i].filterType === 'Contains'
            || (headers[i].filterType !== 'Equal' && headers[i].filterType !== 'StartsWith' && headers[i].filterType !== 'EndsWith')
          );
          const isApplyEqual: boolean = (
            headers[i].filterType === 'Equal'
            || (headers[i].filterType !== 'LessThan'
              && headers[i].filterType !== 'GreaterThan' && headers[i].filterType !== 'LessThanEqual'
              && headers[i].filterType !== 'GreaterThanEqual' && headers[i].filterType !== 'Range')
          );
          const isSkipFilter: boolean = (!isString || headers[i].filterValue === undefined || headers[i].filterValue === '');
          const isSkipNumberFilter: boolean = (!isNumber || headers[i].filterValue === undefined || headers[i].filterValue === '');
          const isSkipDateFilter: boolean = (!isDate || headers[i].filterValue === undefined || headers[i].filterValue === '');
          const isSkipNumberMinFilter: boolean = (!isNumber || headers[i].filterMinValue === undefined
            || (headers[i].filterMinValue !== 0 && headers[i].filterMinValue < 0))
          const isSkipNumberMaxFilter: boolean = (!isNumber || headers[i].filterMaxValue === undefined
            || headers[i].filterMaxValue >= 1000)
          const isSkipDateMinFilter: boolean = (!isDate || headers[i].filterMinValue === undefined || headers[i].filterMinValue === '')
          const isSkipDateMaxFilter: boolean = (!isDate || headers[i].filterMaxValue === undefined || headers[i].filterMaxValue === '')

          let stringFilterValue = '';
          if (!isSkipFilter) {
            stringFilterValue = headers[i].filterValue.toLowerCase();

            // highlight filtering column as a filterd
            headers[i].filterClass = 'filter-active';
          }

          // highlight filtering column as a filterd
          if (!isSkipNumberFilter || !isSkipNumberMinFilter || !isSkipNumberMaxFilter || !isSkipDateFilter) {
            headers[i].filterClass = 'filter-active';
            if (headers[i].filterMinValue === 0 && headers[i].filterMaxValue === 1000) {
              headers[i].filterClass = '';
            }
          } else if (!isSkipDateMinFilter || !isSkipDateMaxFilter) {
            headers[i].filterClass = 'filter-active';
          }
          if (validProperty &&
            (
              (isSkipFilter
                || (isString && isContains && item[headers[i].name].toLowerCase().indexOf(stringFilterValue) > -1)
                || (isString && headers[i].filterType === 'Equal' && item[headers[i].name].toLowerCase() === stringFilterValue)
                || (isString && headers[i].filterType === 'StartsWith'
                  && item[headers[i].name].toLowerCase().indexOf(stringFilterValue) === 0)
                || (isString && headers[i].filterType === 'EndsWith'
                  && item[headers[i].name].toLowerCase().slice(item[headers[i].name].length - stringFilterValue.length) === stringFilterValue)
              )
              &&
              (isSkipNumberFilter
                || (isNumber && isApplyEqual && item[headers[i].name] === headers[i].filterValue)
                || (isNumber && headers[i].filterType === 'LessThan' && item[headers[i].name] < headers[i].filterValue)
                || (isNumber && headers[i].filterType === 'GreaterThan' && item[headers[i].name] > headers[i].filterValue)
                || (isNumber && headers[i].filterType === 'LessThanEqual' && item[headers[i].name] <= headers[i].filterValue)
                || (isNumber && headers[i].filterType === 'GreaterThanEqual' && item[headers[i].name] >= headers[i].filterValue)
              )
              && (isSkipNumberMinFilter || (isNumber && headers[i].filterType === 'Range'
                && item[headers[i].name] >= headers[i].filterMinValue) && (isSkipNumberMaxFilter
                  || item[headers[i].name] <= headers[i].filterMaxValue))
              &&
              (isSkipDateFilter
                || (isDate && isApplyEqual && moment(item[headers[i].name]).diff(moment(headers[i].filterValue), 'days') === 0)
                || (isDate && headers[i].filterType === 'LessThan'
                  && moment(item[headers[i].name]).diff(moment(headers[i].filterValue), 'days') < 0)
                || (isDate && headers[i].filterType === 'GreaterThan'
                  && moment(item[headers[i].name]).diff(moment(headers[i].filterValue), 'days') > 0)
                || (isDate && headers[i].filterType === 'LessThanEqual'
                  && moment(item[headers[i].name]).diff(moment(headers[i].filterValue), 'days') <= 0)
                || (isDate && headers[i].filterType === 'GreaterThanEqual'
                  && moment(item[headers[i].name]).diff(moment(headers[i].filterValue), 'days') >= 0)

              )
              && (isSkipDateMinFilter || (isDate && headers[i].filterType === 'Range'
                && moment(item[headers[i].name]).diff(moment(headers[i].filterMinValue), 'days') >= 0)
                && (isSkipDateMaxFilter || moment(item[headers[i].name]).diff(moment(headers[i].filterMaxValue), 'days') <= 0))
            )
          ) {
            continue;
          } else { // at least one column did not match,
            matchesAll = false;
          }
        }
        return matchesAll;
      });
    }
    this.update.emit({
      totalRows: this.internalData.length
    });
    this.setPage(1);
    this.colFilterIndex = -1;
  }

  onlyOneChangeCheckboxSelection(event: any, item: any) {
    item.IsChecked = false;
    item.showLucyModal = false;
    event.target.checked = false;
    // if (this.CheckboxMemoryService.isNull()) {
    //   item.IsChecked = true;
    //   event.target.checked = true;
    //   this.CheckboxMemoryService.setObjectSelected(item);
    // } else if (this.CheckboxMemoryService.getObjectSelected().CaseID === item.CaseID) {
    //   this.CheckboxMemoryService.setObjectSelected(null);
    // } else {
    //   item.showLucyModal = true;
    // }
    //  this.ChangeCheckboxSelection(event, item);
  }

  //   ChangeCheckboxSelection(e: any, item: any) {
  //     const i: number = this.internalDataWithoutFilter.findIndex(x => x.globalRowIndex === item.globalRowIndex);

  //     if (e.target.checked) {
  //       this.internalDataWithoutFilter[i].IsChecked = true;
  //     } else {
  //       this.internalDataWithoutFilter[i].IsChecked = false;
  //     }

  //     this.offsetTop = e.target.parentElement.offsetTop;
  //     this.offsetLeft = e.target.parentElement.offsetLeft + 30;
  //     const parentHeight: number = e.target.parentElement.offsetParent.clientHeight;

  //     if (parentHeight > this.offsetTop + 182) {
  //       this.toppopup = false;
  //       this.offsetTop = this.offsetTop - 20;
  //     } else {
  //       this.toppopup = true;
  //       this.offsetTop = this.offsetTop - 20;
  //     }

  //     this.rowForActionBox = this.internalDataWithoutFilter[i];

  //     this.CheckboxChange.emit({
  //       eventSource: e,
  //       caseId: this.internalData[i].CaseID,
  //       number: item.Number,
  //       locked: this.internalDataWithoutFilter[i].IsChecked,
  //       row: this.internalDataWithoutFilter[i]
  //     });

  //     this.rowAndPositionSelected.emit({
  //       row: item,
  //       offsetTop: this.offsetTop,
  //       offsetLeft: this.offsetLeft
  //     });
  //     if (this.relatedProfile){
  //      //  this.screeningService.getComments('Summary_RelatedProfile', null, null, item['ApplicationNumber']).subscribe(obj => {
  //         let commentBy = null;
  //         if (obj['data'].length > 0){
  //           commentBy = obj['data'][0].CommentedBy;
  //         }
  //         this.seledtedDuplCase.emit({
  //           event: e,
  //           row: item,
  //           commentedBy: commentBy,
  //           offsetTop: e.target.offsetParent.offsetParent.offsetTop,
  //           offsetLeft: e.target.offsetParent.offsetParent.offsetLeft
  //         });
  //       });
  //     }
  rowAndPositionEmitter() {
    if (this.rowNumber === undefined) {
      this.rowNumber = 0;
    }
    this.pagedItems[this.rowNumber].IsChecked = true;
    this.rowAndPositionSelected.emit({
      row: this.pagedItems[this.rowNumber],
      offsetTop: 250,
      offsetLeft: 300
    });
  }

  SelectedRow(item: any, index: number, e: any) {
    let isHasClass = false;
    if (e.target.classList.contains('collapsable_btn') || e.target.classList.contains('control__indicator')
      || e.target.classList.contains('percent') || e.target.classList.contains('risk_score_pop')) {
      isHasClass = true;
    }

    this.InternalSelectedIndex = index;

    if (e && e.target && e.target.parentElement) {
      this.offsetTop = e.target.parentElement.offsetTop + 13;
    }

    this.selectedRow.emit({
      selectedItem: item,
      selectedIndex: index,
      isShowRHS: isHasClass,
      offsetTop: this.offsetTop,
      offsetLeft: this.offsetLeft,
      event: event
    });
  }


  UpdatePagination(page: number) {
    this.page = page;
    this.pager = this.pagerService.getPager(this.total, page, this.listPerPage);
    this.updatePagination.emit({
      newPage: page
    });
  }

  rowSelection(rowNumber: number) {
    if (rowNumber > this.pagedItems.length - 1) {
      /// this.speechrecognitionService.speechUtterance('The current view has only ' + this.pagedItems.length + ' records');
    } else {
      this.InternalSelectedIndex = rowNumber;
      this.selectedRow.emit({
        selectedItem: this.pagedItems[rowNumber],
        selectedIndex: rowNumber,
        isShowRHS: false
      });
    }
  }

  UpdateSort(item: any) {
    const property: string = item.name;
    this.isDesc = !this.isDesc;
    this.column = property;

    this.updateSort.emit({
      isDesc: this.isDesc,
      column: this.column
    });
  }

  getImage(dmsid: string) {
    // return this.sharedService.getImage(dmsid);
  }

  VisibleColumnsLength() {
    let colLength = 0;
    for (const v of this.internalHeaders) {
      if (this.ColumnVisibility(v.breakpoints)) {
        colLength++;
      }
    }
    return colLength;
  }

  popopen(e: any, data: any) {
    // this.setProviderRedFlag(data);
    // this.setElementPosition.setElementAndReferenceClasses(e);
    // this.setElementPosition.doSetPosition();
  }

  popclose(e: any) {
    $('.popoverwrap').hide();
    // this.redflagcheck=false;
  }

  highLight_SSN(item) {
    if (this.appData) {
      if (((item === this.appData.data[0].Provider_SSN))) {
        return '#FDEBD0';
      }
    }
  }

  highLight_TIN(item) {
    if (this.appData) {
      if (item === this.appData.data[0].Provider_TIN) {
        return '#FDEBD0';
      }
    }
  }

  highLight_NPI(item) {
    if (this.appData) {
      const npi = this.appData.data[0].Provider_NPI;
      if ((item === Number(npi) && this.relatedProfile)) {
        return '#FDEBD0';
      }
    }
  }


  isBorderRequired(item) {
    if (this.appData) {
      if (((item === this.appData.data[0].DuplicateOf))) {
        return true;
      }
      // tslint:disable-next-line:one-line
      else {
        return false;
      }
    }
  }

  onIconClick(iconClicked, $event) {
    this.iconClicked.emit({
      eventsource: $event,
      action: iconClicked
    }
    );
    if (iconClicked === 'duplicateIconClicked') {
      this.refresh = true;
    } else {
      this.refresh = false;
    }
  }
  firstColumnWidth() {
    switch (this.queueType) {
      case 'unassigned':
        return '24px';
      case 'team':
        return '29px';
      default:
        return '0px';
    }
  }

  getPosition(event) {

    this.topposition = (<Element>(<Event>event).srcElement).parentElement.offsetTop + 20;
    const innerWidth = window.innerWidth;
    this.leftposition = innerWidth - 142;
    // (<Element>(<Event>event).srcElement).parentElement.offsetLeft - 50;
  }

  ActionEnter(item: any, index: number, whichaction, e: any) {
    const isHasClass = false;
    this.actionClicked.emit({
      actionHit: whichaction,
      selectedItem: item,
      selectedIndex: index,
      isShowRHS: isHasClass,
      columnName: ''
    });
  }

}
