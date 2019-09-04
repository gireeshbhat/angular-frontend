import { SearchRequest } from './../_models/search-request';
import { Watchlist } from './../_models/Watchlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditWatchlist } from 'app/edit-to-watchlist/EditWatchlist';
import { environment } from 'environments/environment';
import { PickupCaseRequest } from 'app/_models/pickup-case-request';
import { QuickSearchRequest } from 'app/_models/quick-search-request';


@Injectable()
export class AdminmoduleService {

  wl_baseUrl = environment.watchlist_base_url;
  pickup_url = environment.pickup_base_url;
  quicksrch_url = environment.quicksrch_base_url;
  constructor(private http: HttpClient) {
  }

  // Watchlist data
  getChatData(value: SearchRequest) {
    return this.http.post<Watchlist[]>(`${this.wl_baseUrl}elk-data/`, value).catch(this.handleError);
  }

  getDataForUpd(gateKeeperId) {
    return this.http.post<any>(`${this.wl_baseUrl}update/`, gateKeeperId).catch(this.handleError);
  }

  saveWatchlist(params: any): Observable<any> {
    return this.http.post<any>(`${this.wl_baseUrl}`, JSON.stringify(params)).catch(this.handleError);
  }

  updateWatchlist(watchlistModel: EditWatchlist) {
    return this.http.put<any>(`${this.wl_baseUrl}`, JSON.stringify(watchlistModel)).catch(this.handleError);
  }

  deleteWatchlist(gateKeeperId: number): Observable<any> {
    return this.http.patch<any>(`${this.wl_baseUrl}`, gateKeeperId).catch(this.handleError);
  }

  // Pick-up data
  getPickupData(req: PickupCaseRequest) {
    return this.http.post<any[]>(`${this.pickup_url}`, req).catch(this.handleError);
  }

  // Quick search
  getQuickSeatchData(req: QuickSearchRequest) {
    return this.http.post<any[]>(`${this.quicksrch_url}`, req).catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
