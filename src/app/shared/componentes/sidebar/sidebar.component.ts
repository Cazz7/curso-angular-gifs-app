import { Component } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // Inyectamos el servicio
  constructor( private gifsService: GifsService ){

  }

  get tags():string[]{
    return this.gifsService.tagsHistory;
  }

  searchTag(tag:string):void{
    // Para usar el valor
    this.gifsService.searchTag(tag);

  }
}
