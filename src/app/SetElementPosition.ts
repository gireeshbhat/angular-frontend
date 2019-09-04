declare var $: any;
export class SetElementPosition {
  private e: any;
  private clikeditem: any;
  private clikeditemX: any;
  private popitem: any;
  private popitemparent: any;
  private pofixed = false;
  private scrolldiv: any;
  private fixedTopPX: any;

  setElementAndReferenceClasses(eventtrigger: MouseEvent) {
    this.e = eventtrigger;
    this.clikeditem = this.e.target;
    this.clikeditemX = eventtrigger;
    this.popitem = document.getElementById(
      this.e.srcElement.getAttribute('popid')
    );
    this.popitemparent = this.popitem.parentElement;
    this.fixedTopPX = document.getElementById(
      this.e.srcElement.getAttribute('fixedtop')
    );
    this.pofixed = this.clikeditem.getAttribute('popfixed') === 'true';
  }

  doSetPosition() {
    if (!this.clikeditem || !this.popitem) {
      return;
    }
    try {
      const elementsToSet = this.clikeditem;
      const elementsToReference = this.popitem;

      if (this.clikeditem.length === 0 || this.popitem.length === 0) {
        return;
      }

      let mouseX: any;
      let mouseY: any;
      let classnameLeft = '';
      let classnameTop = '';
      const rect = this.clikeditem.getBoundingClientRect();

      let leftposition: number = rect.left;
      let topposition: number = rect.top;

      if (!this.pofixed === true) {
        leftposition = rect.left + window.scrollX;
        topposition = rect.top + window.scrollY;
      }

      const mouseX = leftposition;
      let mouseX1 = leftposition + rect.width;
      let mouseY = 0;
      let mouseY1 = 0;
      if (this.fixedTopPX !== undefined) {
        mouseY = topposition - parseInt(this.fixedTopPX);
        mouseY1 = topposition - parseInt(this.fixedTopPX) + rect.height;
      } else {
        mouseY = topposition;
        mouseY1 = topposition + rect.height;
      }

      this.popitem.classList.remove(
        'left',
        'right',
        'topp',
        'bottomp',
        'fixedpop'
      );

      if (mouseX1 < 0) mouseX1 = 0;
      if (mouseY1 < 0) mouseY1 = 0;

      const windowWidth = window.innerWidth + window.scrollX;
      const windowHeight = window.innerHeight + window.scrollY;
      if (this.pofixed === true) {
        this.popitem.style.position = 'fixed';
        this.popitem.classList.add('fixedpop');
      }

      if (
        this.popitemparent.className === 'popoverwrap' ||
        this.popitemparent.className === 'popoverwrap in'
      ) {
        if (
          this.popitemparent.style.display === 'none' ||
          this.popitemparent.style.display === ''
        ) {
          this.popitemparent.style.display = 'block';

          this.popitemparent.classList.add('in');

          const body = document.body,
            html = document.documentElement;

          const docheight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          console.log(docheight);

          this.popitemparent.style.height = docheight + 'px';
          this.popitemparent.style.top = '-' + window.scrollY + 'px';
        } else {
          this.popitemparent.style.display = 'none';
          this.popitemparent.classList.remove('in');

          return false;
        }
      } else {
        if (
          this.popitem.style.display === 'none' ||
          this.popitem.style.display === ''
        ) {
          this.popitem.style.display = 'block';

          this.popitem.classList.add('in');
          this.clikeditem.classList.add('active');

          $('.overlay_pop').fadeIn();
        } else {
          this.popitem.style.display = 'none';
          this.popitem.classList.remove('in');
          this.clikeditem.classList.remove('active');
          $('.overlay_pop').fadeOut();
          return false;
        }
      }

      const popupprop = this.popitem.getBoundingClientRect();
      const popupWidth = popupprop.width;
      const popupHeight = popupprop.height;

      let popupLeft;
      let popupTop;

      if (mouseY1 + popupHeight > windowHeight) {
        popupTop = mouseY1 - popupHeight + 20;
        classnameTop = 'topp';
      } else {
        popupTop = mouseY - 10;
        classnameTop = 'bottomp';
      }

      if (mouseX1 + popupWidth > windowWidth) {
        popupLeft = mouseX - popupWidth;
        classnameLeft = 'left';
      } else {
        popupLeft = mouseX1;
        classnameLeft = 'right';
      }

      if (popupLeft < 0 || popupLeft === undefined) popupLeft = 0;
      if (popupTop < 0 || popupTop === undefined) popupTop = 0;

      console.log('mouseX' + mouseX + 'mouseY' + mouseY);

      $(this.popitem).offset({ top: popupTop, left: popupLeft });

      this.popitem.classList.add(classnameLeft);
      this.popitem.classList.add(classnameTop);

      console.log('mouseX' + mouseX + 'mouseY' + mouseY);
    } finally {
      this.clikeditem = null;
      this.popitem = null;
    }
  }

  doScroll() {
    const popwrap = document.getElementsByClassName('popoverwrap in');
    if (<HTMLElement>popwrap[0]) {
      (<HTMLElement>popwrap[0]).style.top = '-' + window.scrollY + 'px';
      console.log(window.scrollY);
      console.log('Scrolled' + <HTMLElement>popwrap[0]);
    }
  }
}
