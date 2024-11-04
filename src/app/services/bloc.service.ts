import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bloc } from '../models/bloc';

@Injectable({
  providedIn: 'root'
})
export class BlocService {
  private apiUrl = 'http://localhost:8089/tpfoyer/bloc';

  constructor(private http: HttpClient) { }

  getBlocs(): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.apiUrl}/retrieve-all-blocs`);
  }

  getBloc(id: number): Observable<Bloc> {
    return this.http.get<Bloc>(`${this.apiUrl}/retrieve-bloc/${id}`);
  }

  addBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(`${this.apiUrl}/add-bloc`, bloc);
  }

  deleteBloc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-bloc/${id}`);
  }

  updateBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.put<Bloc>(`${this.apiUrl}/modify-bloc`, bloc);
  }

  getBlocsWithoutFoyer(): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.apiUrl}/trouver-blocs-sans-foyer`);
  }

  getBlocsByNomEtCap(nb: string, cap: number): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.apiUrl}/get-bloc-nb-c/${nb}/${cap}`);
  }
}
