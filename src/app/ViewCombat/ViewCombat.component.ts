import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RandomNumberService } from '../Services/RandomNumber.service';
import { CharacterSelectionService } from '../Services/CharacterSelection.service';
import { CombatService } from '../Services/Combat.service';

@Component({
  selector: 'view-combat',
  standalone: true,
  imports: [],
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

  resultado = this.CombatServiceInject.resultadoCombate;
  muerte = this.CombatServiceInject.estaMuerto;

  ComenzarCombate () :void {


    this.CombatServiceInject.causarDanio(this.goodCharacterSelected, this.evilCharacterSelected);



  }

 }
