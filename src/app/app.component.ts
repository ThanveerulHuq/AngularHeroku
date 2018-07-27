import { Component } from '@angular/core';
import { AuthConfig, OAuthService, JwksValidationHandler, NullValidationHandler } from 'angular-oauth2-oidc';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // authConfig: AuthConfig = {
  //   issuer: 'https://accounts.google.com',
  //   redirectUri: window.location.origin +'/redirect',
  //   clientId: "153534397041-uupegj0ca7ejqlmtmngq59of5u0cahva.apps.googleusercontent.com",
  //   scope: 'openid profile email',
  //   strictDiscoveryDocumentValidation: false
  // };
  authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin +'/redirect',
    clientId: "70826302175-2la4dv8stt7lcgja9im5il48sp2tq188.apps.googleusercontent.com",
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    // dummyClientSecret:"CDgHe2950ydbPigcCOZGZDi1"
  };


  constructor(private oAuthService:OAuthService){
    console.log('in cons');
    this.oAuthService.configure(this.authConfig);
    this.oAuthService.setStorage(localStorage);
    this.oAuthService.tokenValidationHandler = new NullValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    
  }
  ngOnInit() {
    this.oAuthService.tryLogin({
      onTokenReceived: context => {
          console.log('onTokenReceived:', context);
      },
      onLoginError: (err) => {
          console.log('onLoginError:', err);
      }
  }).then(()=>{
    if (!this.oAuthService.hasValidIdToken() || !this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.initImplicitFlow();
    }
  })
  }
}
