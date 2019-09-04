import { Renderer2 } from '@angular/core';

export class GetPositionHelper {
    constructor(private renderer: Renderer2) {

    }
    private classToGetPos: string = null;
    private classToSetReference: string = null;

    getElePos(className: string, referenceClassName:string) {
        debugger;
        this.classToGetPos = className;
        this.classToSetReference = referenceClassName;
    }

    getPos() {
        debugger;
        if (!this.classToGetPos) {
            return;
        }
        try {
            let elements = document.getElementsByClassName(this.classToGetPos);
            let elementReference = document.getElementsByClassName(this.classToSetReference);

            if (elements.length == 0) {
                return;
            }

            let pos: number = (<HTMLElement>elements[0]).offsetTop - (window.innerHeight - elements[0].clientHeight) / 2;
            let d = (<HTMLElement>elements[0]);
            let r = (<HTMLElement>elementReference[0]);

            this.renderer.setStyle(d, 'top', 142);



            //var startY = this.currentYPosition();
            //var stopY = pos;
            //var distance = stopY > startY ? stopY - startY : startY - stopY;
            //if (distance < 100) {
            //    window.scrollTo(0, stopY); return;
            //}
            //var speed = Math.round(distance / 200);
            //if (speed >= 20) speed = 20;

            //var step = Math.round(distance / 100);
            //var leapY = stopY > startY ? startY + step : startY - step;
            //var timer = 0;
            //if (stopY > startY) {
            //    for (var i = startY; i < stopY; i += step) {
            //        this.scrollTo(leapY, timer * speed);
            //        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            //    } return;
            //}
            //for (var i = startY; i > stopY; i -= step) {
            //    this.scrollTo(leapY, timer * speed);
            //    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            //}


        }
        finally {
            this.classToGetPos = null;
        }
    }


    scrollTo(yPoint: number, duration: number) {
        setTimeout(() => {
            window.scrollTo(0, yPoint)
        }, duration);
        return;
    }
    currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }
}
