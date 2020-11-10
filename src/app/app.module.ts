import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StUtilsModule } from '@stlmpp/utils';
import { StStoreModule } from '@stlmpp/store';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StRouterModule } from '@stlmpp/router';
import { environment } from '../environments/environment';
import { StControlModule } from '@stlmpp/control';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    StUtilsModule.forRoot(),
    StStoreModule.forRoot({ production: environment.production }),
    StRouterModule.forRoot(),
    StControlModule.forRoot(),
    AuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
