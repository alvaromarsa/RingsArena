
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { personajesBienObjetos, personajesMalObjetos, Character } from '../../Characters/Characters.component';

@Component({
  selector: 'character-creation',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './character-creation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCreationComponent {

    personajesBien: Character[] = personajesBienObjetos;
    personajesMal: Character[] = personajesMalObjetos;

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

        this.personajesBien = [... this.personajesBien, newCharacter];

      break;

      case "Mal":

       this.personajesMal = [... this.personajesMal, newCharacter];

      break;


    }





  }
}
