import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('txtsearch') txtsearch! : ElementRef<HTMLInputElement>

  constructor(private gifsService : GifsService){}

  search = () => {
    const value = this.txtsearch.nativeElement.value
   
    if(value.trim().length == 0){
      return
    }

    this.gifsService.searchGifs( value )

    this.txtsearch.nativeElement.value = ''
  }
}
