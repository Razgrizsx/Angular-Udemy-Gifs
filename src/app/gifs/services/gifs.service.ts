import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, GifsResponse } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = "W95oa88Oig3L8hlF1zIhALfhD7MFUk66"
  private _history: string[] = JSON.parse(localStorage.getItem("query")!) || []
  private _results: Gif[] = []
  private serviceurl : string = "https://api.giphy.com/v1/gifs"

  get history() {
    return [...this._history]
  }

  get results() {
    return [...this._results]
  }

  searchGifs = (query: string) => {
 
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set("limit", "10")
      .set("q", query)

      
    this.http.get<GifsResponse>(`${this.serviceurl}/search`, {params})
    .subscribe((res) => {
      this._results = res.data;
      localStorage.setItem('resultados', JSON.stringify(this.results))}
    )

    /* await fetch(`https://api.giphy.com/v1/gifs/search?api_key=W95oa88Oig3L8hlF1zIhALfhD7MFUk66&q=${query}&limit=10`)
    .then(res => res.json())
    .then(data => this._results = data.data) */

    if(!this._history.includes( query.toLocaleLowerCase() )) {
      this._history.unshift(query.toLocaleLowerCase())
      this._history = this._history.splice(0,10)
      localStorage.setItem("query", JSON.stringify(this._history))
    }
    
   
   
  }

  constructor( private http: HttpClient ) { 
    this._results = JSON.parse(localStorage.getItem("resultados")!) || []
    
  }
}
