import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { Guia, CreateGuiaRequest } from '../shared/models/guia';

@Injectable({ providedIn: 'root' })
export class ShipmentsService {
  private base = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  createShipment(payload: CreateGuiaRequest): Observable<Guia> {
    return this.http.post<Guia>(`${this.base}/guias`, payload);
  }

  listShipments(onlyActive = true): Observable<Guia[]> {
    const params = new HttpParams().set('activo', String(onlyActive));
    return this.http.get<any>(`${this.base}/guias`, { params }).pipe(
      map((res: any) => Array.isArray(res) ? res as Guia[] : (res?.data as Guia[]) ?? [])
    );
  }

  getGuia(id: string): Observable<Guia> {
    return this.http.get<Guia>(`${this.base}/guias/${id}`);
  }
}
