import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {


  @Input()
  // Yo lo hice así
  //public gif: Gif = {} as Gif;
  // Pero el profe lo hizo asi
  public gif!: Gif;

  // Validar que se mande datos
  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required.');
  }

}
