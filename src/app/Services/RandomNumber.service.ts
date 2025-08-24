import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

    public eleccionDanio(): number {
    const min: number = 1;
    const max: number = 2;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor() { }

}
