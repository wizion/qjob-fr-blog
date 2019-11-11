import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BlogList } from './blog-list';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


const localUrl = 'assets/data/smartphone.json';
const apiUrl = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }

  getBlogPosts(): Observable<any> {
    return this.http.get<BlogList[]>(apiUrl + "posts").pipe(
     retry(3), catchError(this.handleError<BlogList[]>('getBlogPosts', [])));
  }

  getBlogPostById(alias: any): Observable<any> {
  	return this.http.get<BlogList[]>(apiUrl+"posts/?alias=" + alias).pipe(
  		retry(3), catchError(this.handleError<BlogList[]>('getBlogPosts', [])))
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}