import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['uk', 'en']);
    this.translateService.setDefaultLang('en');
  }

}
