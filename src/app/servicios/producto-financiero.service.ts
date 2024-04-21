import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoFinancieroService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts() {
    const headers = new HttpHeaders({
      'authorId':environment.authorId
    });
    return this.http.get(this.apiUrl, {headers})
  }

  postProduct(productData: any): Observable <any> {
    const headers = new HttpHeaders({
      'authorId':environment.authorId
    });
    return this.http.post<any>(this.apiUrl, productData, {headers})
  }

  putProduct(productId: string, productData: any){
    const headers = new HttpHeaders({
      'authorId':environment.authorId
    });
    const urlBase = this.apiUrl+'/'+productId;
    return this.http.put(this.apiUrl, productData, { headers })
  }
}
