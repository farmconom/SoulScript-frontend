import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInPage {
  @ViewChild('toggleCard', { static: false }) toggleCard!: ElementRef;
  isPageLoaded = false;
  isNavigatingToAnotherPage = false;

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isNavigatingToAnotherPage = true;
      } else if (event instanceof NavigationEnd) {
        this.isNavigatingToAnotherPage = false;
        this.isPageLoaded = true;
      }
    });
  }

  toggle() {
    this.toggleCard.nativeElement.click();
  }

  redirectTo(url: string) {
    if(url) {
      this.router.navigate([url]);
    }
  }
}
