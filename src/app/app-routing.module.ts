import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RealtimedataComponent } from './realtimedata/realtimedata.component';

const routes: Routes = [
  {path: 'Home', component: HomePageComponent},
  {path: 'RealTimeData', component: RealtimedataComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
