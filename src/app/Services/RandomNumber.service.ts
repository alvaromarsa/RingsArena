import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../Characters/Characters.component';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

    public eleccionDanio(): number {
    const min: number = 1;
    const max: number = 2;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

    public randomNumberArray(array$:Observable<Character[]>):Observable<number>{

      return array$.pipe(
        map(arr => arr.length)
      )
    }

    public obtenerIndiceAleatorio(array: Character[]): number {
    if (array.length === 0) {
      return -1; // Caso de array vacío
    }
    const max = array.length;
    const min = 0;

    // Calcula un número entre 0 (inclusive) y max (exclusivo)
    return Math.floor(Math.random() * (max - min) + min);
  }

  constructor() { }

}
