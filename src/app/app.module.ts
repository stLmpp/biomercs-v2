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
import { SpinnerModule } from './components/spinner/spinner.module';
import { ButtonModule } from './components/button/button.module';
import { ModalModule } from './components/modal/modal.module';
import { IconModule } from './components/icon/icon.module';
import { CardModule } from './components/card/card.module';
import { CollapseModule } from './components/collapse/collapse.module';

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
    ModalModule.forRoot(),
    SpinnerModule,
    ButtonModule,
    IconModule,
    CardModule,
    CollapseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
