import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginStateService } from '../../services/login-state.service';

@Component({
  selector: 'app-login-modal',
  template: `
    <div *ngIf="!loggedIn; else loggedOut">
    <div class="py-2 block">
    <button (click)="signInWithGoogle()"
      class="w-64 bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-2 border-b-4 border-blue-600 block hover:border-blue-400 rounded">
      <img class="inline-flex w-6 h-6 mr-2" src="assets/Glogo.png"/>
      Sign in with Google
    </button>
    </div>
    <div class="py-2 block">
    <button (click)="signInWithFacebook()"
      class="w-64 bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-2 border-b-4 border-blue-600 block hover:border-blue-400 rounded">
      <img class="inline-flex w-6 h-6 mr-2" src="assets/Flogo.png"/>
      Sign in with facebook
    </button>
    </div>
    </div>
    <ng-template #loggedOut>
    <div class="text-center">
      <button (click)="signOut()"
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Sign Out
      </button>
    </div>
    </ng-template>
  `,
  styles: []
})
export class LoginModalComponent implements OnInit {

 loggedIn: boolean= false;

  constructor(public dialogRef: MatDialogRef<LoginModalComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private loginService: LoginStateService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("user") != null){
      this.loggedIn=true;
    }else{
      this.loggedIn= false;
    }
    this.loginService.getEmitter().subscribe( (emit) => {
      if (emit==true){
        this.loggedIn=true;
        console.log("login-modal Component is notified of successfull login!");
        this.dialogRef.close();
      } else if (emit==false){
        console.log("login-modal Component is notified of successfull log-out!");
      }
    })
  }

  signInWithGoogle(): void {
    this.loginService.googleLogin();
  }

  signInWithFacebook(): void {
    this.loginService.facebookLogin();
  }

  signOut(): void {
    this.loginService.signOut();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
