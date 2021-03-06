import { HttpClient } from '@angular/common/http';

import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLocalizationLoader(http: HttpClient) {

  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/localization/app/', suffix: '.json' },
    { prefix: './assets/localization/login/', suffix: '.json' },
    { prefix: './assets/localization/registration/', suffix: '.json' },
    { prefix: './assets/localization/registration/patient-info/', suffix: '.json' },
    { prefix: './assets/localization/registration/patient-address-info/', suffix: '.json' },
    { prefix: './assets/localization/registration/patient-disease-info/', suffix: '.json' },

    { prefix: './assets/localization/dashboard/sidenav-start/', suffix: '.json' },
    { prefix: './assets/localization/patient-cases/', suffix: '.json' }
  ]);

}
