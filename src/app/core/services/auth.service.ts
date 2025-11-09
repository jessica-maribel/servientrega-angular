import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../shared/models/auth';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token$ = new BehaviorSubject<string | null>(localStorage.getItem(TOKEN_KEY));

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, payload).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        this._token$.next(res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this._token$.next(null);
  }

  get token() { return this._token$.value; }
  isAuthenticated() { return !!this._token$.value; }
}
