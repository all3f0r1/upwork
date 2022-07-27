import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dropdownToggle = false;
  isLogged = false;

  constructor() // public translate: TranslateService
  {}

  ngOnInit(): void {}

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
