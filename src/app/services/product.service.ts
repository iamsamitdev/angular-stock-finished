import { Injectable, inject } from '@angular/core'

// Import CookieService
import { CookieService } from 'ngx-cookie-service'

// Import HttpClient and HttpHeaders
import { HttpClient, HttpHeaders } from '@angular/common/http'

// Import Observable
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = environment.dotnet_api_url
  private http = inject(HttpClient)
  private cookieService = inject(CookieService)

  // Read token from cookie
  token = this.cookieService.get("LoggedInToken") || ""

  // Header for GET, DELETE
  httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.token
    })
  }

  // Header for POST, PUT
  httpOptionsPost  = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer '+ this.token
    })
  }

  // CRUD Methods ----------------------------------------------------
  
    // getAllProducts(): Observable<any> {
  //   return this.http.get<any>(
  //     this.apiURL + 'Product', 
  //     this.httpOptions
  //   )
  // }

  // Get All Products by parameter (page: number, limit: number, selectedCategory: string, searchQuery: string)
  getAllProducts(page: number, limit: number, selectedCategory: string, searchQuery: string): Observable<any> {
    let url = this.apiURL + 'Product?page=' + page + '&limit=' + limit

    if (selectedCategory) {
      url += '&selectedCategory=' + selectedCategory
    }

    if (searchQuery) {
      url += '&searchQuery=' + searchQuery
    }

    return this.http.get<any>(
      url, 
      this.httpOptions
    )
  }

  // Get Product By ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'Product/' + id, 
      this.httpOptions
    )
  }

  // Create Product
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'Product', 
      product, 
      this.httpOptionsPost
    )
  }

  // Update Product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(
      this.apiURL + 'Product/' + id,
      product, 
      this.httpOptionsPost
    )
  }

  // Delete Product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(
      this.apiURL + 'Product/' + id, 
      this.httpOptions
    )
  }

}
