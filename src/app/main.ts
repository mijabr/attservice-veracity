
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { VeracityModule } from './veracity.module';

if (process.env.ENV === 'production')
{
  enableProdMode();
}
const platform = platformBrowserDynamic();
platform.bootstrapModule(VeracityModule);
