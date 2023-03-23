import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FontawesomeIconsModule } from './fontawesome/fontawesome.icons.module';
import { AikidoUsersService } from './services/aikido.users.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FontawesomeIconsModule,
  ],
  providers: [AikidoUsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
