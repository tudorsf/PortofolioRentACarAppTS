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

    convertToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
      });
  }

    
  }