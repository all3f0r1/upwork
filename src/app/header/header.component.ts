import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription = new Subscription();
  dropdownToggle = false;
  isLogged!: boolean;

  constructor(
    private authService: AuthService // public translate: TranslateService
  ) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isLogged = !!user;
      // console.log(this.isLogged);
    });
  }

  // switchLang(lang: string) {
  //   this.translate.use(lang);
  // }

  // This should be a directive, I know, but it came up
  // as a more concise solution, since the click has to
  // trigger an event on a child element...
  onToggle() {
    this.dropdownToggle = !this.dropdownToggle;
  }
}
