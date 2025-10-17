import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { personajesBienObjetos, personajesMalObjetos, Character } from '../Characters/Characters.component';

@Injectable({
  providedIn: 'root'
})
export class CharacterStateService {

  private goodCharactersSubject = new BehaviorSubject<Character[]>(personajesBienObjetos);
  private evilCharactersSubject = new BehaviorSubject<Character[]>(personajesMalObjetos);

  goodCharacters$: Observable<Character[]> = this.goodCharactersSubject.asObservable();
  evilCharacters$: Observable<Character[]> = this.evilCharactersSubject.asObservable();

addCharacter(newCharacter: Character, alignment: 'bien' | 'mal'): void {
    if (alignment === 'bien') {
      const current = this.goodCharactersSubject.getValue();
      // Creamos un nuevo array (Spread Operator) para asegurar que el cambio se detecte (inmutabilidad)
      this.goodCharactersSubject.next([...current, newCharacter]);
    } else if (alignment === 'mal') {
      const current = this.evilCharactersSubject.getValue();
      this.evilCharactersSubject.next([...current, newCharacter]);
    }
  }

  constructor() { }

}
