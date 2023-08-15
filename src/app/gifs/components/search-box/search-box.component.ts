import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar: </h5>
  <input type="text"
         class="form-control"
         placeholder="Buscar gifs..."
         (keyup.enter)="searchTag( )"
         #txtTagInput
         />
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // Inyectamos el servicio
  constructor( private gifsService: GifsService ){
    if(gifsService.tagsHistory.length > 0){
      this.gifsService.searchTag(gifsService.tagsHistory[0]);
    }
  }

  searchTag(){
    // Para usar el valor
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    // limpiamos la caja de texto
    this.tagInput.nativeElement.value = '';

  }
}
