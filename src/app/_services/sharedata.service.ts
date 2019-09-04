import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';

// import { Mailbox } from 'app/_models/mailbox';
// import { Finding } from 'app/_models/finding';
//  import { ApplicationHistoryInfo } from 'app/_models/AccountList';
// import { Comment } from 'app/_models/comment';
// import { Attachment } from 'app/_models/attachment';
// import { AppDetails } from 'app/_models/AppDetails';
// import { Alert } from 'app/_models/Alert';

@Injectable()
export class SharedataService {
    private caseNo = new BehaviorSubject<string>('');
    private applicationNo = new BehaviorSubject<string>('');
    private tabName = new BehaviorSubject<string>('');
    private caseComments = new Subject<any[]>();
    private caseMails = new Subject<any[]>();
    private caseFindings = new Subject<any[]>();
    private caseAttachments = new Subject<any[]>();

    private caseSummary = new Subject<any>();
    private ProfileApp = new Subject<any>();

    private RiskScoreName = new BehaviorSubject<any[]>(null);
    private RiskScoreValue = new BehaviorSubject<any[]>(null);

    private propertyName = new BehaviorSubject<string>('');

    private spiderFlag = new BehaviorSubject<boolean>(false);
    // ProfileApp: AppDetails = new AppDetails();

    // for Accounts
    private accountNo = new BehaviorSubject<string>('');
    private accountSummary = new Subject<any>();
    private accountMails = new Subject<any[]>();
    private accountFindings = new Subject<any[]>();
    private accountApplHist = new Subject<any[]>();
    private accountAttachments = new Subject<any[]>();
    private accountAlerts = new Subject<any[]>();
    private accountComments = new Subject<any[]>();

    constructor() { }

    setCaseNo(applicationNo: string) {
        this.caseNo.next(applicationNo);
    }

    getCaseNo(): Observable<any> {
        return this.caseNo.asObservable();
    }

    setApplicationNo(applicationNo: string) {
        this.applicationNo.next(applicationNo);
    }

    getApplicationNo(): Observable<any> {
        return this.applicationNo.asObservable();
    }

    setCaseTab(Tab: string) {
        this.tabName.next(Tab);
    }

    getCaseTab(): Observable<any> {
        return this.tabName.asObservable();
    }

    // Comment
    setCaseComments(comments: Comment[]) {
        this.caseComments.next(comments);
    }

    getCaseComments(): Observable<Comment[]> {
        return this.caseComments.asObservable();
    }

    // // finding
    // setCaseFindings(findings: Finding[]) {
    //     this.caseFindings.next(findings);
    // }

    // getCaseFindings(): Observable<Finding[]> {
    //     return this.caseFindings.asObservable();
    // }

    // mail
    // setCaseMails(mails: Mailbox[]) {
    //     this.caseMails.next(mails);
    // }

    // getCaseMails(): Observable<Mailbox[]> {
    //     return this.caseMails.asObservable();
    // }

    // // attachments
    // setCaseAttachments(attachments: Attachment[]) {
    //     this.caseAttachments.next(attachments);
    // }

    // getCaseAttachments(): Observable<Attachment[]> {
    //     return this.caseAttachments.asObservable();
    // }

    // summary
    setCaseSummary(summary: any) {
        this.caseSummary.next(summary);
    }

    getCaseSummary(): Observable<any[]> {
        return this.caseSummary.asObservable();
    }

    // setProfileApp(appDetails: AppDetails)
    // {
    //     this.ProfileApp.next(appDetails)
    // }

    getProfileApp(): Observable<any[]>  {
        return this.ProfileApp.asObservable();
    }

    setRiskScoreName(RiskScore: any[]) {
        this.RiskScoreName.next(RiskScore);
    }

    getRiskScoreName(): Observable<any[]> {
        return this.RiskScoreName.asObservable();
    }

    setRiskScoreValue(RiskScoreValue: any[]) {
        this.RiskScoreValue.next(RiskScoreValue);
        console.log('RiskScoreValue from shared service');
        console.log(RiskScoreValue);
    }

    getRiskScoreValue(): Observable<any[]> {
        return this.RiskScoreValue.asObservable();
    }

    setChartPropertyName(propertyName: string) {
        console.log('prop name ' + propertyName);
        this.propertyName.next(propertyName);
    }

    getChartPropertyName(): Observable<any> {
        return this.propertyName.asObservable();
    }


    setSpiderFlag(Value: boolean) {
        console.log('setSpiderFlag' + Value);
        this.spiderFlag.next(Value);
    }

    getSpiderFlag(): Observable<any> {
        return this.spiderFlag.asObservable();
    }

    setAccountNo(accountNo: string) {
        this.accountNo.next(accountNo);
    }

    getAccountNo(): Observable<any> {
        return this.accountNo.asObservable();
    }

    setAccountTab(Tab: string) {
        this.tabName.next(Tab);
    }

    getAccountTab(): Observable<any> {
        return this.tabName.asObservable();
    }

    //  Account summary
    setAccountSummary(summary: any) {
        this.accountSummary.next(summary);
    }

    getAccountSummary(): Observable<any[]> {
        return this.accountSummary.asObservable();
    }
    // //  Account Alert
    // setAccountAlerts(alerts: Alert[]) {
    //     this.accountAlerts.next(alerts);
    // }

    // getAccountAlerts(): Observable<Alert[]> {
    //     return this.accountAlerts.asObservable();
    // }

    // //  Account finding
    // setAccountFindings(findings: Finding[]) {
    //     this.accountFindings.next(findings);
    // }

    // getAccountFindings(): Observable<Finding[]> {
    //     return this.accountFindings.asObservable();
    // }

    //  setAccountApplHist(applHistory: ApplicationHistoryInfo[]) {
    //      this.accountApplHist.next(applHistory);
    //  }

    //  getAccountApplHist(): Observable<ApplicationHistoryInfo[]> {
    //      return this.accountApplHist.asObservable();
    //  }

    //  Account Application History

    //  Account mail
    // setAccountMails(mails: Mailbox[]) {
    //     this.accountMails.next(mails);
    // }

    // getAccountMails(): Observable<Mailbox[]> {
    //     return this.accountMails.asObservable();
    // }

    //  Account attachments
    // setAccountAttachments(attachments: Attachment[]) {
    //     this.accountAttachments.next(attachments);
    // }

    // getAccountAttachments(): Observable<Attachment[]> {
    //     return this.accountAttachments.asObservable();
    // }

    //  AccountComment
    setAccountComments(comments: Comment[]) {
        this.accountComments.next(comments);
    }

    getAccountComments(): Observable<Comment[]> {
        return this.accountComments.asObservable();
    }
}
