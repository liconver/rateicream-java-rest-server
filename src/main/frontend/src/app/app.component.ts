import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SocialUser, AuthService } from "angularx-social-login";
import {MatDialog} from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { LoginStateService } from './services/login-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Native

})
export class AppComponent implements OnInit {
  
  title = 'rateicecream';
  menu: boolean = false;
  loggedIn: boolean = false;
  user: SocialUser = null;
 
  constructor(public dialog: MatDialog, private loginService: LoginStateService, public authService: AuthService) { }

  navToggle(){
    this.menu = !this.menu;       
  }

  ngOnInit(): void {
    console.log("in app-component oninit hook");
    if(sessionStorage.getItem("user") != null){
      this.loggedIn=true;
    }else{
      this.loggedIn= false;
    }
    this.loginService.getEmitter().subscribe( (emit) => {
      if (emit==true){
        this.loggedIn=true;
        console.log(" app Component is notified of successfull login!");
      } else if (emit==false){
        this.loggedIn=false;
        console.log(" app Component is notified of successfull log-out!");
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '300',
    });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

 

}
