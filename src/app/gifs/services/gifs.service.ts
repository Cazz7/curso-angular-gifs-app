import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'}) // Para que sea global
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  // Esto debería ser una variable de entorno
  private _apiKey: string = 'd8EytFOX4dmWaqiPz9RqFtwwlAaswN5p';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  constructor( private http: HttpClient ) { this.loadLocalStorage() }

  get tagsHistory(){
    // Los arreglos por defecto se pasan como referencia por lo que se pueden
    // modificar en otro lado inesperadamente
    // es por esto que uso el operador spread
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string):void{

    // Manejaremos todo en minuscula
    tag = tag.toLowerCase();

    // Si existe remover para ponerlo al inicio
    if( this._tagsHistory.includes(tag) ){
      // Solo dejo pasar los diferentes. Borro el tag si esta duplicado
      // También se podría hacer con un pop y sacar el elemento a borrar
      this._tagsHistory = this._tagsHistory.filter( (oldtag) => oldtag !== tag );
    }

      // Inserto ese tag al inicio neuvamente
      this._tagsHistory.unshift(tag)
      // Limitar el arreglo a 10
      this._tagsHistory = this.tagsHistory.splice(0,10);
      this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    // Debo serializar
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{
    if( localStorage.getItem('history') ){
      // Debo deserializar
      // Se le debe garantizar a typescript que no es nulo
      // non null assertion operator
      this._tagsHistory  = JSON.parse(localStorage.getItem('history')!);
      if(this._tagsHistory.length > 0){
        this.searchTag(this._tagsHistory[0]);
      }
    }
  }

  async searchTag(tag: string):Promise<void>{

    // No hacer nada si me llega vacio
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    // Forma con el fetch
    // fetch("https://api.giphy.com/v1/gifs/search?api_key=d8EytFOX4dmWaqiPz9RqFtwwlAaswN5p&q=valorant&limit=10")
    //   .then( resp => resp.json() ) // serializo la respuesta
    //   .then( data => console.log(data));

      // También se podría hacer con
      // const resp = await fetch("URL_API")
      // const data = await resp.json()
      // console.log(data)

      //Parámetros del query
      const params = new HttpParams()
        .set('api_key', this._apiKey)
        .set('limit','10')
        .set('q',tag);

      //Usando observables
      this.http.get<SearchResponse>(`${ this._serviceUrl }/search`,{ params })
        //.subscribe( (resp:SearchResponse) => { // Se puede poner el tipado aquí pero no es el lugar ideal
        .subscribe( resp => {
          this.gifList = resp.data;
        } );
  }
}
