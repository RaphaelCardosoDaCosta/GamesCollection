import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { apiData, platform, RawgapiService, short_screenshots } from '../../services/rawgapi.service';
import { TraksComponent } from '../traks/traks.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-details',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './game-details.component.html'
})
export class GameDetailsComponent implements OnInit {

  constructor(
    private serviceApi: RawgapiService,
    private route: ActivatedRoute) { }

  plataformDetails = [
    {
      name: 'PlayStation',
      icon_d: 'M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52 4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112 16zM12 14.32V16s7.666-2.338 8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0 0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12 14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024 10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934 11.934 0 007 12.046l-.024 1.5z'
    },
    {
      name: "Xbox",
      icon_d: 'M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z'
    },
    {
      name: "PC",
      icon_d: 'M0 13.772l6.545.902V8.426H0zM0 7.62h6.545V1.296L0 2.198zm7.265 7.15l8.704 1.2V8.425H7.265zm0-13.57v6.42h8.704V0z'
    },
    {
      name: "Nintendo",
      icon_d: 'M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135 1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0 000-12.13h-5.12zm-1.33 2.304h2.401l3.199 5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z'
    },
  ];

  gameDescription: apiData = {} as apiData;
  gameDetails: apiData = {} as apiData;
  platformsUsed: platform[] = [];
  screenshots: short_screenshots[] = [];
  screenshotsIndex: short_screenshots[] = [];
  ngOnInit(): void {

    const gameName = this.route.snapshot.paramMap.get('slug');
    console.log("slug da URL -> ", gameName)


    if (gameName) {
      this.serviceApi.sigleTitle(gameName).subscribe({
        next: (dados) => {
          this.gameDetails = dados;
          this.gameDetails?.parent_platforms.map((i) => {
            this.platformsUsed.push(i);
          });
          this.gameDetails?.short_screenshots.map((o) => {
            this.screenshots.push(o);
          });
          this.screenshotsIndex = this.screenshots.slice(1);
          // conferindo - check
          console.log(this.platformsUsed);
          console.log(this.gameDetails);
          console.log(this.screenshotsIndex);
          console.log(this.gameDetails.slug);
          // conferindo - check
        },
        error: (erro) => console.error("Erro ao buscar game", erro)
      });

      this.serviceApi.singleTitleDetailsText(gameName).subscribe({
        next: (data) => {
          this.gameDescription = data;
        },
        error: (data) => {
          console.log("Erro ao buscar mais detalhes de texto", data);
        }
      });


    }

  }

  expandirTexto: boolean = false;

  textToogle() {
    this.expandirTexto = !this.expandirTexto
  }

}
