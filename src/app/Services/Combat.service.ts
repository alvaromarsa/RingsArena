import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import { CharacterSelectionService } from './CharacterSelection.service';
import { Character } from '../Characters/Characters.component';
import { RandomNumberService } from './RandomNumber.service';


@Injectable({
  providedIn: 'root'
})
export class CombatService {

   combateIniciado = false;

   GoodCharacterSelected = this.characterSelectionService.GoodCharacterSelection();
   EvilCharacterSelected = this.characterSelectionService.EvilCharacterSelection();

   //resultadoCombate$ = new Subject<string>();
   estaMuerto$ = new Subject<string>();

    public resultadosArray: string[] = [];
    public resultados$ = new Subject<string[]>();

  public causarDanio(p1: Character, p2: Character): void {

    this.resultadosArray = [];
    const { name: name1 } = p1;
    const { name: name2 } = p2;


    const combateID :any = setInterval(() => {
      let whoAttacks =  this.randomNumberService.eleccionDanio();
      let dodgeRandom: number = Number((Math.random()).toFixed(2));


      if (whoAttacks === 1) {
        if (p2.dodge !== undefined) {
          if (dodgeRandom <= p2.dodge) {
            this.resultadosArray.push(name2 + ' ha esquivado el ataque de ' + name1);
            this.resultados$.next(this.resultadosArray);

          } else {
            this.death(p1, p2, whoAttacks, combateID);
          }
        } else {
          this.death(p1, p2, whoAttacks, combateID);
        }
      } else {
        if (p1.dodge !== undefined) {
          if (dodgeRandom <= p1.dodge) {
            this.resultadosArray.push(name1 + ' ha esquivado el ataque de ' + name2);
            this.resultados$.next(this.resultadosArray);

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
      this.resultadosArray.push(name1 + ' ha causado ' + damage1 + ' puntos de daño a ' + name2);
      this.resultados$.next(this.resultadosArray);
      //this.resultadoCombate$.next(name1 + ' ha causado ' + damage1 + ' puntos de daño a ' + name2);
      if (p2.hp <= 0) {
        p2.isAlive = false;
        this.estaMuerto$.next(name2 + ' ha muerto');
        clearInterval(interval);
      }
    } else {
      p1.hp = p1.hp - damage2;
      this.resultadosArray.push(name2 + ' ha causado ' + damage2 + ' puntos de daño a ' + name1);
      this.resultados$.next(this.resultadosArray);
      //this.resultadoCombate$.next(name1 + ' ha causado ' + damage1 + ' puntos de daño a ' + name2);
      if (p1.hp <= 0) {
        p1.isAlive = false;
        this.estaMuerto$.next(name1 + ' ha muerto');
        clearInterval(interval);
      }
    }
  }


  public cleanCombatText (): void{
    this.resultados$.next([]);

    // Limpia el mensaje de muerte
    this.estaMuerto$.next('');

    // (Opcional) Reinicia la bandera de combate si es necesario
    this.combateIniciado = false;

  }


  constructor(private characterSelectionService: CharacterSelectionService, private randomNumberService : RandomNumberService) { }

}
