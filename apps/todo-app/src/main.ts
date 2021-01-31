import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";

if (environment.production) {
  enableProdMode();
}

I18n.setLanguage("en");
I18n.putVocabulariesForLanguage("en", {
  [Translations.EMPTY_USERNAME]: "A valid E-Mail address must be provided"
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
