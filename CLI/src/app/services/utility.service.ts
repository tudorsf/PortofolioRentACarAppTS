import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class UtilityService {

    constructor(){}

    public getEnumOptions(enumObj: any): { label: string, value: Number }[] {
      const options = [];
      for (const key in enumObj) {
        if (isNaN(Number(key))) {
          options.push({ label: key, value: enumObj[key] });
        }
      }
      return options;
    }

    
  }