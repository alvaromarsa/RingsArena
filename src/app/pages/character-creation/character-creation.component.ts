
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { NavbarComponent } from "../navbar/navbar.component";
import { personajesBienObjetos, personajesMalObjetos, Character } from '../../Characters/Characters.component';
import { CharacterStateService } from '../../Services/CharacterState.service';

@Component({
  selector: 'character-creation',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './character-creation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCreationComponent {

    showConfirmationMessage: boolean = false;

    private characterStateService = inject(CharacterStateService);

    goodCharacters$: Observable<Character[]> = this.characterStateService.goodCharacters$;
    evilCharacters$: Observable<Character[]> = this.characterStateService.evilCharacters$;
  /*
    personajesBien: Character[] = personajesBienObjetos;
    personajesMal: Character[] = personajesMalObjetos;
  */

  addCharacter ( name: string, power: string, vida: string, esquiva: string, alineamiento: string ): void {



    const powerValue = parseInt(power, 10);
    const vidaValue = parseInt(vida, 10);
    const esquivaValue = parseFloat(esquiva)

    const newCharacter: Character ={

      hp : vidaValue,
      isAlive : true,
      name : name,
      damage : powerValue,
      dodge : esquivaValue
    }

    switch(alineamiento){
      case "Bien":

        this.characterStateService.addCharacter(newCharacter, 'bien');

      break;

      case "Mal":

      this.characterStateService.addCharacter(newCharacter, 'mal');

      break;


    }


    this.showConfirmationMessage = true;


  }
}
