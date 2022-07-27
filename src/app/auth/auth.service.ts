import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, ReplaySubject, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new ReplaySubject<User>(); // Same as BehaviorSubject (allows to get access to both current and previous value), but starts at null
  private expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((resp) => {
          this.handleNextUser(
            resp.email,
            resp.localId,
            resp.idToken,
            +resp.expiresIn
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((error) => this.handleError(error)),
        tap((resp) => {
          this.handleNextUser(
            resp.email,
            resp.localId,
            resp.idToken,
            +resp.expiresIn
          );
        })
      );
  }

  autoLogin() {
    // JSON.parse transforms a string object back into a JSON
    // const userData: {
    //   email: string;
    //   id: string;
    //   _token: string;
    //   _tokenExpirationDate: string;
    // } = JSON.parse(localStorage.getItem('userData'));
    // if (!userData) return;
    // const loadedUser = new User(
    //   userData.email,
    //   userData.id,
    //   userData._token,
    //   new Date(userData._tokenExpirationDate)
    // );
    // if (loadedUser.token) {
    //   this.user.next(loadedUser);
    //   const expirationDuration =
    //     new Date(userData._tokenExpirationDate).getTime() -
    //     new Date().getTime();
    //   this.autoLogout(expirationDuration);
    // }
  }

  logout() {
    // this.user.next(null);
    // localStorage.removeItem('userData');
    // this.router.navigate(['/auth']);
    // if (this.expirationTimer) clearTimeout(this.expirationTimer);
    // this.expirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    // this.expirationTimer = setTimeout(() => {
    //   this.logout();
    // }, expirationDuration);
  }

  private handleNextUser(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    // const expDate = new Date(new Date().getTime() + expiresIn * 1000); // *1000 because seconds -> ms
    // const user = new User(email, userId, token, expDate);
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000); // *1000 because seconds -> ms
    // // Store in a cookie, locally
    // // JSON.stringify is a serializer from JSON to string
    // localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';
    if (!error.error || !error.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email doesn't exist";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
