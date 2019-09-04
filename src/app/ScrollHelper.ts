export class ScrollHelper {
    private classToScrollTo: string = null;

    scrollToFirst(className: string) {
        this.classToScrollTo = className;
    }

    doScroll() {
        if (!this.classToScrollTo) {
            return;
        }
        try {
            let elements = document.getElementsByClassName(this.classToScrollTo);
            let highLightElem = document.getElementsByClassName('highlight');
            for (var i = 0; i < highLightElem.length; i++) {
                highLightElem[i].classList.remove('highlight');
            }

            if (elements.length == 0) {
                return;
            }
            //elements[0].scrollIntoView({behavior: "smooth", block: "end"});
            let pos: number = (<HTMLElement>elements[0]).offsetTop - (window.innerHeight - elements[0].clientHeight) / 2;
            let d=elements[0];
            d.className += " highlight";
            var startY = this.currentYPosition();
            var stopY = pos;
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                window.scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 200);
            if (speed >= 20) speed = 20;

            var step = Math.round(distance / 100);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    this.scrollTo(leapY, timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for (var i = startY; i > stopY; i -= step) {
                this.scrollTo(leapY, timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            setTimeout(function () {
                d.classList.remove("highlight");
            }, 3000);
        }
        finally {
            this.classToScrollTo = null;
        }
    }
   
    doPsScroll() {
        if (!this.classToScrollTo) {
            return;
        }
        try {
            debugger;
            let elements = document.getElementsByClassName(this.classToScrollTo);         

            if (elements.length == 0) {
                return;
            }
            console.log((<HTMLElement>elements[0]).offsetTop);
            let pos1 = (<HTMLElement>elements[0]).getBoundingClientRect();    
            let pos: number = (<HTMLElement>elements[0]).offsetTop - (window.innerHeight - elements[0].clientHeight) / 2;
            let d = elements[0];
            var startY = this.currentYPosition();
            var stopY = pos;
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                window.scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 200);
            if (speed >= 20) speed = 20;

            var step = Math.round(distance / 100);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    this.scrollTo(leapY, timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for (var i = startY; i > stopY; i -= step) {
                this.scrollTo(leapY, timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }
          
        }
        finally {
            this.classToScrollTo = null;
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
