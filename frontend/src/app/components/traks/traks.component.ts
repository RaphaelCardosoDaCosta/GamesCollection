import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { apiData, RawgapiService } from '../../services/rawgapi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traks',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './traks.component.html',
})
export class TraksComponent implements OnChanges {

  constructor(private rawgApiService: RawgapiService, private toastr: ToastrService) { }

  mostrarAlerta() {
    this.toastr.success('done.');
  }

  @Input() titleTrack!: string;
  cardhover: boolean = false;

  titles: apiData[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titleTrack']) {
      const value = changes['titleTrack'].currentValue;
      
      if (value === "Mais famosos") {
        this.rawgApiService.getMaisFamosos().subscribe({
          next: (dados) => this.titles = dados,
          error: (erro) => console.error("Erro ao buscar Mais famosos", erro)
        });
      }

      if (value === "Recentes") {
        this.rawgApiService.getRecentes().subscribe({
          next: (dados) => this.titles = dados,
          error: (erro) => console.error("Erro ao buscar Recentes", erro)
        });
      }

      if (value === "Retrôs") {
        this.rawgApiService.getRetros().subscribe({
          next: (dados) => this.titles = dados,
          error: (erro) => console.error("Erro ao buscar Retrôs", erro)
        });
      }
    }
  }

  scrollX = 0;
  cardWidth = 260; // largura do card com gap

  scrollLeft() {
    this.scrollX = Math.max(this.scrollX - this.cardWidth * 2, 0);
  }

  scrollRight() {
    const totalCards = this.titles.length;
    const visibleCards = Math.floor(window.innerWidth / this.cardWidth);
    const maxScroll = this.cardWidth * (totalCards - visibleCards);
    this.scrollX = Math.min(this.scrollX + this.cardWidth * 2, maxScroll);
  }
}
