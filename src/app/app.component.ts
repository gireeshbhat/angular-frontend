import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('showhide', [
      state(
        'in',
        style({
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewChecked {
  display = false;
  showOverlay = false;
  searctextExist = '';
  showAdvanceSearch = false;
  searchResultIn = '';
  filterTag: string;
  searchRes: any;
  isShow = '';
  @ViewChild('headersearchtext') headersearchtext: ElementRef;
  @ViewChild('searchboxli') searchboxli: ElementRef;
  @ViewChild('searchWrap') searchWrap: ElementRef;
  isEnterHit = false;
  errorMsg = '';
  showTaskClass = '';

  animationState = 'in';
  public menus = [
    {
      Imgclass: 'flaticon icomoon  icon-team',
      Pageurl: 'admin',
      LinkText: 'Admin'
    }
  ];

  digitalHarborKeyword: any[] = [];
  highlightedKeyword: any[] = [];
  searchResult = '';
  constructor(
    private router: Router
  ) {}
  ngOnInit() {}

  ngAfterViewChecked() {}

  overlayclose(event) {
    this.searchResultIn = '';
    this.showAdvanceSearch = false;
    if (this.isShow !== 'hide') {
      this.isShow = 'hide';
      this.getScrollbarWidth(this.isShow);
    }
  }
  getScrollbarWidth(isShow) {
    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isShow === 'show') {
      const x = <HTMLButtonElement>(
        document.querySelectorAll('.navbar-fixed-top')[0]
      );
      x.style.right = scrollWidth + 'px';
      document.body.style.paddingRight = scrollWidth + 'px';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.paddingRight = '0px';
      document.body.classList.remove('modal-open');
      const x = <HTMLButtonElement>(
        document.querySelectorAll('.navbar-fixed-top')[0]
      );
      x.style.right = '0px';
    }
  }

  anchorClicked(value: any) {
    this.router.navigate(['/application/screening/summary']);
    this.showOverlay = false;
  }

  ShowSideBar(event) {
    if (this.showTaskClass === '') {
      this.showTaskClass = 'showShort';
    } else if (this.showTaskClass === 'showShort') {
      this.showTaskClass = 'showFull';
    } else {
      this.showTaskClass = '';
    }
  }
  MenuClickFunction(isFullShow) {
    if (isFullShow === true) {
      this.showTaskClass = 'showFull';
    }
  }
}
