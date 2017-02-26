import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Component Imports
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailComponent } from './components/detail/detail.component';
import { TickerScreenComponent } from './components/ticker-screen/ticker-screen.component';
import { SearchComponent } from './components/search/search.component';
import { NewsComponent } from './components/news/news.component'; 

// Third Party Imports
import { routing } from './app.routing';  // Import routing config file
import { Ng2PaginationModule } from 'ng2-pagination';   // Pagination for Historical Data

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    DetailComponent,
    TickerScreenComponent,
    SearchComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2PaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
