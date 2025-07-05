import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLSearchParams } from 'node:url';
import { map, Observable } from 'rxjs';

export interface short_screenshots {
  id: number,
  image: string
}

export interface platform {
  id: number,
  name: string,
  slug: string
}

export interface apiData {
  id: number,
  slug: string,
  name: string,
  background_image: string,
  background_image_additional: string,
  description_raw: string,
  description: string,
  parent_platforms: platform[],
  short_screenshots: short_screenshots[]
}


@Injectable({providedIn: 'root'})
export class RawgapiService {

  constructor(private http: HttpClient) { }

  
  getTitles(pages: number):Observable<apiData[]> {
    const url: string = 
    `https://api.rawg.io/api/games?key=25160f8ba6484fefb6c35fcab1f19dc0&page=${pages}&page_size=5`;
    return this.http.get<{results: apiData[]}>(url)
    .pipe(map(responseData => responseData.results));
  }

  getMaisFamosos() {
    const url: string = 
    `https://api.rawg.io/api/games?key=25160f8ba6484fefb6c35fcab1f19dc0&page_size=6&exclude_parents=true&exclude_collection=123&metacritic=95,100`;
    return this.http.get<{results: apiData[]}>(url)
    .pipe(map(responseData => responseData.results));
  }

  getRecentes() {
    const url: string = 
    `https://api.rawg.io/api/games?key=25160f8ba6484fefb6c35fcab1f19dc0&page_size=6&dates=2019-01-01,2025-12-31&exclude_parents=true&exclude_collection=123&metacritic=80,100`;
    return this.http.get<{results: apiData[]}>(url)
    .pipe(map(responseData => responseData.results));
  }

   getRetros() {
    const url: string = 
    `https://api.rawg.io/api/games?key=25160f8ba6484fefb6c35fcab1f19dc0&page_size=6&dates=1985-01-01,2004-12-31&exclude_parents=true&exclude_collection=123&metacritic=90,100`;
    return this.http.get<{results: apiData[]}>(url)
    .pipe(map(responseData => responseData.results));
  }

  sigleTitle(titleName: string): Observable<apiData>{
    const urlTitleSearch =
    `https://api.rawg.io/api/games?key=25160f8ba6484fefb6c35fcab1f19dc0&search=${titleName}&search_precise=true&search_exact=true`;
    return this.http.get<{results: apiData[]}>(urlTitleSearch)
    .pipe(map(data => data.results[0]));
  }

  singleTitleDetailsText(title: string): Observable<apiData> {
    const urlPreciseTexts = `https://api.rawg.io/api/games/${title}?key=25160f8ba6484fefb6c35fcab1f19dc0&search_precise=true&search_exact=true`
    return this.http.get<apiData>(urlPreciseTexts);
  }

}
