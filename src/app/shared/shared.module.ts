import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { LazyImageComponent } from './componentes/lazy-image/lazy-image.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LazyImageComponent
  ]
})
export class SharedModule { }
