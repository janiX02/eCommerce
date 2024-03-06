import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JaniXShopFormService {

  private countriesUrl = environment.janixShopApiUrl + '/countries?size=40';
  private statesUrl = environment.janixShopApiUrl + '/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(map(response => response._embedded.countries));
  }

  getStates(code: string): Observable<State[]> {
    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${code}`;

    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(map(response => response._embedded.states));
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const currentYear: number = new Date().getFullYear(); 
    const endYear: number = currentYear + 10;

    for (let year = currentYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}