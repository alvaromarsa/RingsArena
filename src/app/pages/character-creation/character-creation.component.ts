
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { NavbarComponent } from "../navbar/navbar.component";
import { Character } from '../../Characters/Characters.component';
import { CharacterStateService } from '../../Services/CharacterState.service';
import { FormUtils } from '../../Utils/form-utils';


@Component({
  selector: 'character-creation',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './character-creation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCreationComponent {

 private fb = inject(FormBuilder);
 private characterStateService = inject(CharacterStateService);
 formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({

    name: ['', [Validators.required, Validators.minLength(3)]],
    power: [0, [Validators.required, Validators.min(10)]],
    vida: [0, [Validators.required, Validators.min(10)]],
    esquiva: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    alineamiento: ['', Validators.required]

  })

    showConfirmationMessage: boolean = false;

    goodCharacters$: Observable<Character[]> = this.characterStateService.goodCharacters$;
    evilCharacters$: Observable<Character[]> = this.characterStateService.evilCharacters$;
  /*
    personajesBien: Character[] = personajesBienObjetos;
    personajesMal: Character[] = personajesMalObjetos;
  */

/*(click)="addCharacter(nombreInput.value, poderInput.value, vidaInput.value, esquivaInput.value, alineamientoInput.value)"*/


  addCharacter ( name: string, power: string, vida: string, esquiva: string, alineamiento: string ): void {

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();

      return;
    }


    const powerValue = parseInt(power, 10);
    const vidaValue = parseInt(vida, 10);
    const esquivaValue = parseFloat(esquiva)

    const newCharacter: Character ={

      hp : vidaValue,
      maxhp : vidaValue,
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

    this.myForm.reset({
      power: 0,
      vida: 0,
      esquiva: 0

    });


    this.showConfirmationMessage = true;


  }


}
