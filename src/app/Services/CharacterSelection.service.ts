import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, take } from 'rxjs';

import { CharacterStateService } from './CharacterState.service';
import { personajesBienObjetos, personajesMalObjetos, Character } from '../Characters/Characters.component';


//ESTE SERVICIO COJE LOS PERSONAJES DEL CHARACTER STATE Y LOS CLONA PARA PODER PASARSELO AL SERVICIO DE COMBATE PARA
//QUE USE LOS CLONADOS

@Injectable({
  providedIn: 'root'
})
export class CharacterSelectionService {

  private characterStateService = inject(CharacterStateService);

    goodCharacters$: Observable<Character[]> = this.characterStateService.goodCharacters$;
    evilCharacters$: Observable<Character[]> = this.characterStateService.evilCharacters$;


      // ✅ Función de ayuda para realizar la copia profunda (Deep Clone)
    private deepClone(characters: Character[]): Character[] {
        // JSON.parse(JSON.stringify()) es el método más simple para copiar arrays de objetos de datos simples
        return JSON.parse(JSON.stringify(characters));
    }

    /**
     * Obtiene una copia (clon) del array de personajes buenos
     * sin modificar los originales en el CharacterStateService.
     */
    getClonedGoodCharacters(): Observable<Character[]> {
        return this.goodCharacters$.pipe(
            // 1. Obtiene la primera emisión del array
            take(1),
            // 2. Aplica el Deep Clone al array completo
            map(characters => this.deepClone(characters))
        );
    }

    getClonedEvilCharacters(): Observable<Character[]> {
        return this.evilCharacters$.pipe(
            take(1),
            map(characters => this.deepClone(characters))
        );
    }

  private getRandomCharacter (clonedGoodCharacter: Character[], clonedEvilCharacter: Character[]) {

    const personajeBienAleatorio: Character = clonedGoodCharacter[Math.floor(Math.random() * clonedGoodCharacter.length)];
    const personajeMalAleatorio: Character = clonedEvilCharacter[Math.floor(Math.random() * clonedEvilCharacter.length)];

    const arrayCharacters: Character[] = [personajeBienAleatorio, personajeMalAleatorio]

    return arrayCharacters;
  }

  getCharactersForCombat(): Observable<Character[]> {

    // 1. Usamos forkJoin para esperar a que AMBOS Observables de clonación terminen
    return forkJoin({
        good: this.getClonedGoodCharacters(),
        evil: this.getClonedEvilCharacters()
    }).pipe(
        // 2. Cuando tenemos los dos arrays clonados, los mapeamos a la selección final
        map(results => {
            const clonedGoodCharacters = results.good;
            const clonedEvilCharacters = results.evil;

            // Lógica de selección (reutilizas tu función getRandomCharacter)
            return this.getRandomCharacter(clonedGoodCharacters, clonedEvilCharacters);
        })
    );
}


  constructor() { }

}
