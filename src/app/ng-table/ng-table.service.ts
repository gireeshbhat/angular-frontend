import { Subject } from 'rxjs/Subject';

export class NgTableService {
  Headers = new Subject<any>();
  Data = new Subject<any>();
  NeedActionBox = new Subject<boolean>();
  needCheckBox = new Subject<boolean>();
  DataPaging = new Subject<boolean>();
  PageSize = new Subject<number>();
  PageSizeChart = new Subject<any>();
  UpdateCheckboxForARecord = new Subject<any>();
  ShowReviewerMapping = new Subject<boolean>();
  SelectedIndex = new Subject<number>();
  GlobalFilter = new Subject<any>();
  IsMailBoxTableTD = new Subject<boolean>();
  ChildTableClass = new Subject<string>();
  ChildRowClass = new Subject<string>();
  Key = new Subject<string>();
  AnchorColumnNames = new Subject<string>();
  Status_Change = new Subject<any>();
  AnchorColumn_Clicked = new Subject<any>();
  testOutputChanged = new Subject<number>();
  testInputChanged = new Subject<number>();

  constructor() {}

  testOutput(num) {
    this.testOutputChanged.next(num);
  }

  testInput(num: number) {
    this.testInputChanged.next(num * num);
  }
}
