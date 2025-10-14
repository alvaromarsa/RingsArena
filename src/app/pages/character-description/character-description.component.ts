import { ChangeDetectionStrategy, Component } from '@angular/core';

import { personajesBienObjetos, personajesMalObjetos, Character } from '../../Characters/Characters.component';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'character-description',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './character-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDescriptionComponent {

    personajesBien: Character[] = personajesBienObjetos;
    personajesMal: Character[] = personajesMalObjetos;

 }
