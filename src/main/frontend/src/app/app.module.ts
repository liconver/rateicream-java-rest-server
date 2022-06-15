import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { provideConfig } from '../socialloginConfig';
import { HttpClientModule }    from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import {MatTableModule} from '@angular/material/table';
import { RatingsComponent } from './components/ratings/ratings.component';
import { CommunityComponent } from './components/community/community.component';
import { BlogComponent } from './components/blog/blog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginModalComponent,
    ProfileComponent,
    RatingsComponent,
    CommunityComponent,
    BlogComponent
  ],
  imports: [
    MatTableModule,
    HttpClientModule,
    SocialLoginModule,
    MatDialogModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
