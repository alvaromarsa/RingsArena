import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { RandomNumberService } from '../Services/RandomNumber.service';
import { CharacterSelectionService } from '../Services/CharacterSelection.service';
import { CombatService } from '../Services/Combat.service';
import { NavbarComponent } from "../pages/navbar/navbar.component";

@Component({
  selector: 'view-combat',
  standalone: true,
  imports: [AsyncPipe, NavbarComponent],
  templateUrl: './ViewCombat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCombatComponent {

  private RandomNumberInyect =inject(RandomNumberService);
  private GoodCharacterInject = inject(CharacterSelectionService);
  private EvilCharacterInject = inject(CharacterSelectionService);
  private CombatServiceInject = inject(CombatService)

  //randomNumber = this.RandomNumberInyect.eleccionDanio();
  goodCharacterSelected = this.GoodCharacterInject.GoodCharacterSelection();
  evilCharacterSelected = this.EvilCharacterInject.EvilCharacterSelection();

  combate = this.CombatServiceInject.combateIniciado
  //resultado = this.CombatServiceInject.resultadoCombate$;
  muerte = this.CombatServiceInject.estaMuerto$;

  resultado2 = this.CombatServiceInject.resultados$

  ComenzarCombate () :void {


    this.CombatServiceInject.causarDanio(this.goodCharacterSelected, this.evilCharacterSelected);
    this.combate = true;

  }

 }
