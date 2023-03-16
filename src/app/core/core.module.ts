import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LayoutComponent,
  ],
  exports: [LayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class CoreModule {}
