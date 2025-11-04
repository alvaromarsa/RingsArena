import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';


import { CombatService } from '../../Services/Combat.service';
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { Character } from '../../Characters/Characters.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'view-combat',
  standalone: true,
  imports: [AsyncPipe, NavbarComponent],
  templateUrl: './ViewCombat.component.html',

})
export class ViewCombatComponent {

  public CombatServiceInject = inject(CombatService);
  private cdr = inject(ChangeDetectorRef);

  goodCharacterSelected: Character = {
      name: 'Placeholder',
      hp: 0,
      maxhp: 0,
      isAlive: false,
      damage: 0,
      level: 0
    };
    evilCharacterSelected: Character = {
      name: 'Placeholder',
      hp: 0,
      maxhp: 0,
      isAlive: false,
      damage: 0,
      level: 0
    };

  combate = this.CombatServiceInject.combateIniciado$;
  muerte = this.CombatServiceInject.estaMuerto$;
  ganador = this.CombatServiceInject.ganador$;
  resultado2 = this.CombatServiceInject.resultados$;


  ComenzarCombate () :void {

    this.CombatServiceInject.cleanCombatText();

    this.CombatServiceInject.ComenzarCombate();

  };


 }
