import { Injectable } from '@angular/core';

import { CharacterSelectionService } from './CharacterSelection.service';
import { Character } from '../Characters/Characters.component';
import { RandomNumberService } from './RandomNumber.service';

@Injectable({
  providedIn: 'root'
})
export class CombatService {

   GoodCharacterSelected = this.characterSelectionService.GoodCharacterSelection();
   EvilCharacterSelected = this.characterSelectionService.EvilCharacterSelection();
   //randomNumber = this.randomNumberService.eleccionDanio();
   resultadoCombate :string = 'esta es la inicializacion del resultado';
   estaMuerto : string = 'esta es la inicializacion de estaMuerto';


  public causarDanio(p1: Character, p2: Character): void {

    const { name: name1 } = p1;
    const { name: name2 } = p2;


    const combateID :any = setInterval(() => {
      let whoAttacks =  this.randomNumberService.eleccionDanio();
      let dodgeRandom: number = Number((Math.random()).toFixed(2));

      if (whoAttacks === 1) {
        if (p2.dodge !== undefined) {
          if (dodgeRandom <= p2.dodge) {
            this.resultadoCombate = name2 + ' ha esquivado el ataque de ' + name1;
            console.log(name2 + ' ha esquivado el ataque de ' + name1);
          } else {
            this.death(p1, p2, whoAttacks, combateID);
          }
        } else {
          this.death(p1, p2, whoAttacks, combateID);
        }
      } else {
        if (p1.dodge !== undefined) {
          if (dodgeRandom <= p1.dodge) {
            this.resultadoCombate = name2 + ' ha esquivado el ataque de ' + name1;
            console.log(name1 + ' ha esquivado el ataque de ' + name2);
          } else {
            this.death(p1, p2, whoAttacks, combateID);
          }
        } else {
          this.death(p1, p2, whoAttacks, combateID);
        }
      }
    }, 2000);
  }


  private death(p1: Character, p2: Character, electionDamage: number, interval: number): void {
    const { name: name1, damage:damage1 } = p1;
    const { name: name2, damage:damage2 } = p2;

    if (electionDamage === 1) {
      p2.hp = p2.hp - damage1;
      this.resultadoCombate = name1 + ' ha causado ' + damage1 + ' puntos de daño a ' + name2;
      console.log(name1 + ' ha causado ' + damage1 + ' puntos de daño a ' + name2 );
      if (p2.hp <= 0) {
        p2.isAlive = false;
        this.estaMuerto = name2 + ' ha muerto';
        console.log(name2 + ' ha muerto');
        clearInterval(interval);
      }
    } else {
      p1.hp = p1.hp - damage2;
      this.resultadoCombate = name1 + ' ha causado ' + damage1 + ' puntos de daño a ' + name2;
      console.log(name2 + ' ha causado ' + damage2 + ' puntos de daño a ' + name1 );
      if (p1.hp <= 0) {
        p1.isAlive = false;
        this.estaMuerto = name1 + ' ha muerto';
        console.log(name1 + ' ha muerto');
        clearInterval(interval);
      }
    }
  }

  constructor(private characterSelectionService: CharacterSelectionService, private randomNumberService : RandomNumberService) { }

}
