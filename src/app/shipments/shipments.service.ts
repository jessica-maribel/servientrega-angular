import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateShipmentRequest, CreateShipmentResponse, ShipmentListItem } from '../shared/models/shipment';
import { TrackingResponse } from '../shared/models/tracking';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShipmentsService {
  private base = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  createShipment(payload: CreateShipmentRequest): Observable<CreateShipmentResponse> {
    return this.http.post<CreateShipmentResponse>(`${this.base}/guias`, payload);
  }

  listShipments(onlyActive = true): Observable<ShipmentListItem[]> {
    const params = new HttpParams().set('active', String(onlyActive));
    return this.http.get<ShipmentListItem[]>(`${this.base}/guias`, { params });
  }

  getTracking(shipmentId: string): Observable<TrackingResponse> {
    return this.http.get<TrackingResponse>(`${this.base}/guias/${shipmentId}/tracking`);
  }
}
