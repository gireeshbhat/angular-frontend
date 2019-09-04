import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { Ng2CompleterModule } from 'ng2-completer';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { PopoverModule } from 'ng4-popover';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { NgTableComponent } from './ng-table/ng-table.component';
import { HighlightCases, HighlightSearch } from './_directives/pipe.component';
import { AdminmoduleService } from './_services/adminmodule.service';
import { WatchListComponent } from './watch-list/watch-list.component';
import { AddToWatchlistComponent } from './add-to-watchlist/add-to-watchlist.component';
import { EditToWatchlistComponent } from './edit-to-watchlist/edit-to-watchlist.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NgBusyModule } from 'ng-busy';
import { PickUpHistoryComponent } from './pick-up-history/pick-up-history.component';
import { Ng5SliderModule } from 'ng5-slider';
import { QuickSearchComponent } from './quick-search/quick-search.component';


declare let require: any;
export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const hcm = require('highcharts/highcharts-more');
  const exp = require('highcharts/modules/exporting');
  const Wheel = require('assets/js/Plugins/highcharts/wheel-event');
  hcm(hc);
  exp(hc);
  Wheel(hc);
  return hc;
}

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    NgTableComponent,
    HighlightSearch,
    HighlightCases,
    AppComponent,
    WatchListComponent,
    AddToWatchlistComponent,
    EditToWatchlistComponent,
    PickUpHistoryComponent,
    QuickSearchComponent
  ],
  exports: [
    NgTableComponent,
    Ng2CompleterModule,
    IonRangeSliderModule,
    HighlightSearch,
    HighlightCases,
    ToastModule,
    MessagesModule,
    MessageModule,
    PerfectScrollbarModule
  ],
  imports: [
    PerfectScrollbarModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    Ng2CompleterModule,
    IonRangeSliderModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    routing,
    BootstrapModalModule,
    PopoverModule,
    BrowserAnimationsModule,
    NgBusyModule,
    Ng5SliderModule,
  ],
  providers: [
    ToastModule,
    PerfectScrollbarModule,
    MessagesModule,
    MessageModule,
    AdminmoduleService,
	DatePipe,
    MessageService
  ],
  entryComponents: [AddToWatchlistComponent, EditToWatchlistComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
