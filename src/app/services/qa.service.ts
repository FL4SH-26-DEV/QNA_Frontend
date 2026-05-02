import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AskRequest, AskResponse } from '../models/qa.model';

@Injectable({
  providedIn: 'root',
})
export class QaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ask(context: string, question: string): Observable<AskResponse> {
    const payload: AskRequest = { context, question };
    return this.http
      .post<AskResponse>(`${this.apiUrl}/ask`, payload)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unexpected error occurred. Please try again.';

    if (error.status === 0) {
      message = 'Cannot reach the server. Please check that the backend is running.';
    } else if (error.status === 400) {
      message = error.error?.error || 'Invalid request. Please check your inputs.';
    } else if (error.status === 401) {
      message = 'API authentication failed. Please check the server configuration.';
    } else if (error.status === 429) {
      message = 'Too many requests. Please wait a moment before trying again.';
    } else if (error.status >= 500) {
      message = 'Server error. Please try again later.';
    }

    return throwError(() => new Error(message));
  }
}
