import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TraksComponent } from '../traks/traks.component';
import { apiData, RawgapiService } from '../../services/rawgapi.service';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, TraksComponent],
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {

  images = [
    'assets/ghost-of-tsushima-fan-4k-ep.jpg',
    'assets/cod.jpg',
    'assets/zelda2.jpg',
    'assets/deathstranding.png',
    'assets/tlou.jpg'
  ];

  responseImages: apiData[] = [];

  currentSlide = 0;

  constructor(@Inject(PLATFORM_ID)
  private platformId: Object,
    private rawgApiService: RawgapiService) { }

  mostrar: boolean = false;


  ngOnInit(): void {
    // para não dar erro no build. Verifica o browser para iniciar o ssr
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => this.nextSlide(), 7000);
    }

  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

}
