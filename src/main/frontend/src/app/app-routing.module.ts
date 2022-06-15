import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { BlogComponent } from './components/blog/blog.component';
import { CommunityComponent } from './components/community/community.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'home', redirectTo: '/', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'ratings', component: RatingsComponent},
  {path: 'community', component: CommunityComponent},
  {path: 'blog', component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
