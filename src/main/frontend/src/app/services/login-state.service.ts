import { Injectable, Output, EventEmitter } from '@angular/core';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  loggedIn: boolean;
  user: SocialUser;

  constructor(private socialAuthService: AuthService,
              private userService: UserService,
              ) { }

  googleLogin(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (userData) => {
      // on success
      console.log(userData);
      // this.userService.validateToken(userData.idToken).subscribe( 
      //   onSuccess => {
      //     console.log("success " +onSuccess);
      //     //login was successful
      //    //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
      //    sessionStorage.setItem("user", JSON.stringify(userData));
      //   }, onFail => {
      //     console.log("fail " +onFail);
      //      //login was unsuccessful
      //    //show an error message
      //   }
      // );
      this.userService.validateToken(userData.idToken).subscribe( respon => {
        console.log(respon);
        if (respon.token == 'valid'){
          sessionStorage.setItem("session", JSON.stringify(respon));
          sessionStorage.setItem("user", JSON.stringify(userData));
          this.loggedIn=true;
          this.fireIsLoggedIn.emit(this.loggedIn);
        } else if (respon.token == 'invalid') {
          console.log('couldnt verify token');
        }
      }, err => {
        console.log('err: '+err);
        alert('error in authenticating token');
      }
      )
    }
    )
  }

  facebookLogin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then( (userData) => {
      // on success
      console.log(userData);
      this.userService.validateFbToken(userData.authToken).subscribe( respon => {
        console.log(respon);
        if (respon.token == 'valid'){
          sessionStorage.setItem("session", JSON.stringify(respon));
          sessionStorage.setItem("user", JSON.stringify(userData));
          this.loggedIn=true;
          this.fireIsLoggedIn.emit(this.loggedIn);
        } else if (respon.token == 'invalid') {
          console.log('couldnt verify token');
        }
      }, err => {
        console.log('err: '+err);
        alert('error in authenticating token');
      }
      )
    })
  }

  getAuthState() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn){
        this.fireIsLoggedIn.emit(user);
      }
    });
  }

  signOut(): void {
    this.loggedIn=false
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("session");
    this.fireIsLoggedIn.emit(this.loggedIn);
    this.socialAuthService.signOut();

  }

  getEmitter() {
		return this.fireIsLoggedIn;
	}
}
