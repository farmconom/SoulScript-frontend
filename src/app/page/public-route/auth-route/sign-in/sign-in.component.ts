import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInPage {
  @ViewChild('toggleCard', { static: false }) toggleCard!: ElementRef;

  constructor(
    private router: Router,
  ) {}

  toggle() {
    this.toggleCard.nativeElement.click();
  }

  redirectTo(url: string) {
    if(url) {
      this.router.navigate([url]);
    }
  }
}
