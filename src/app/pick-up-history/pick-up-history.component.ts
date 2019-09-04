import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { AdminmoduleService } from 'app/_services';
import { PickupCaseRequest } from 'app/_models/pickup-case-request';
import { Subscription } from 'rxjs';

import * as _ from '../../assets/js/pickup-event-invoker.js';

@Component({
  selector: 'app-pick-up-history',
  templateUrl: './pick-up-history.component.html',
  styleUrls: ['./pick-up-history.component.css'],
  animations: [
    trigger('showhide', [
      state('in', style({
        transform: 0
      })),
      transition('void => *', [
        style({
          transform: 'translate(100%)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translate(100%)'
        }))
      ])
    ]),
    trigger('easeInOut',
      [state('void', style({ height: '0px', opacity: 0 })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', animate('0.4s ease'))
      ]
    )
  ]
})
export class PickUpHistoryComponent implements OnInit {

  busy: Subscription;
  myActions: any[];
  defaultView = 'cases';
  fetchSize: number;
  onOffSlider = true;
  onoffFilter = false;
  userId: string;
  caseRequest: PickupCaseRequest;

  sliderLimitsValue = 3;
  sliderLimitsOptions = {
    floor: 3,
    ceil: 15,
    step: 3,
    showTicks: true
  };

  sliderDaysValue = 1;
  sliderDaysOptions = {
    floor: 1,
    ceil: 5,
    step: 1,
    showTicks: true
  };

  constructor(
    private route: ActivatedRoute,
    private adminmoduleService: AdminmoduleService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;
    this.userId = routeParams.userId;

    this.onOffSlider = true;
    this.fetchSize = this.sliderLimitsValue;
    this.fetchCaseDetails();
  }

  fetchCaseDetails(size?: number) {
    if (size) {
      this.fetchSize = size;
    }
    this.caseRequest = new PickupCaseRequest(this.userId, this.defaultView, this.fetchSize);
    this.busy = this.adminmoduleService.getPickupData(this.caseRequest).subscribe(data => {
      this.myActions = data;
    });

  }

  eventFilter(value: string) {
    this.defaultView = value;
    if ('cases' === this.defaultView) {
      this.sliderLimitsValue = 3;
    } else {
      this.sliderDaysValue = 1;
    }
    this.fetchSize = value === 'cases' ? this.sliderLimitsValue : this.sliderDaysValue
    this.fetchCaseDetails();
  }

  navigateTo(action) {
    _.sendNsCmd(action.navigator, action.number);
  }

}
