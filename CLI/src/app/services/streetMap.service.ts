import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class StreetMapService {

    constructor(private http: HttpClient){}

    createMap(){
        return this.http.get("https://nominatim.openstreetmap.org/ui/search.html?q=Romania")
      }
    
  }