import { Injectable } from '@angular/core';

import { personajesBienObjetos, personajesMalObjetos, Character } from '../Characters/Characters.component';

@Injectable({
  providedIn: 'root'
})
export class CharacterSelectionService {

  GoodCharacterSelection () : Character {

    const personajeBienAleatorio: Character = personajesBienObjetos[Math.floor(Math.random() * personajesBienObjetos.length)];

    return personajeBienAleatorio;

  }

  EvilCharacterSelection () : Character {

    const personajeMalAleatorio: Character = personajesMalObjetos[Math.floor(Math.random() * personajesMalObjetos.length)];

    return personajeMalAleatorio
  };



  constructor() { }

}
