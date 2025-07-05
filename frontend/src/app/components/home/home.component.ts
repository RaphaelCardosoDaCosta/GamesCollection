import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { TraksComponent } from '../traks/traks.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CarouselComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
