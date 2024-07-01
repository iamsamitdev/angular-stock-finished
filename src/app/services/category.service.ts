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
export class CategoryService {

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

  // Get All Categories
  getAllCategories(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'Category', 
      this.httpOptions
    )
  }

}
