import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  templateUrl: './Characters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent { }



export interface Character {
  hp: number;
  isAlive: boolean;
  name: string;
  damage: number;
  dodge?: number;
}


  const aragorn: Character = {
    hp: 150,
    isAlive: true,
    name: 'Aragorn',
    damage: 70,
    dodge: 0.20
  };

  const legolas: Character = {
    hp: 90,
    isAlive: true,
    name: 'Legolas',
    damage: 60,
    dodge: 0.25
  };

  const gimli: Character = {
    hp: 120,
    isAlive: true,
    name: 'Gimli',
    damage: 50,
    dodge: 0.10
  };

  const frodo: Character = {
    hp: 50,
    isAlive: true,
    name: 'Frodo',
    damage: 30,
    dodge: 0.30
  };

  const boromir: Character = {
    hp: 100,
    isAlive: true,
    name: 'Boromir',
    damage: 45,
    dodge: 0.20
  };

  const gandalf: Character = {
    hp: 500,
    isAlive: true,
    name: 'Gandalf',
    damage: 150,
    dodge: 0.25
  };

  const ent: Character = {
    hp: 300,
    isAlive: true,
    name: 'un ent',
    damage: 100,
  };

  const theoden: Character = {
    hp: 110,
    isAlive: true,
    name: 'Theoden',
    damage: 45,
    dodge: 0.20
  };

  const eomer: Character = {
    hp: 95,
    isAlive: true,
    name: 'Eomer',
    damage: 50,
    dodge: 0.20
  };

  const gwaihir: Character = {
    hp: 200,
    isAlive: true,
    name: 'Gwaihir',
    damage: 120,
    dodge: 0.35
  };

  const sam: Character = {
    hp: 45,
    isAlive: true,
    name: 'Sam',
    damage: 35,
    dodge:0.30
  };

  const montaraz: Character = {
    hp: 75,
    isAlive: true,
    name: 'un montaraz',
    damage: 55,
    dodge:0.22
  };

  const numenoreano: Character = {
    hp: 150,
    isAlive: true,
    name: 'un númenoreano',
    damage: 55,
    dodge: 0.17
  };

  const espectro: Character = {
      hp: 200,
      isAlive: true,
      name: 'un espectro',
      damage: 130,
  };

  const radagast: Character = {
      hp: 435,
      isAlive: true,
      name: 'Radagast',
      damage: 135,
      dodge: 0.25
  };

  const orco: Character = {
    hp: 80,
    isAlive: true,
    name: 'un orco',
    damage: 40,
    dodge: 0.15
  };

  const nazgul: Character = {
    hp: 400,
    isAlive: true,
    name: 'un Nazgul',
    damage: 120,
    dodge: 0.25
  };

  const sauron: Character = {
    hp: 600,
    isAlive: true,
    name: 'Sauron',
    damage: 150,
  };

  const haradrim: Character = {
    hp: 90,
    isAlive: true,
    name: 'un haradrim',
    damage: 45,
    dodge: 0.23
  };

  const mumakil: Character = {
    hp: 300,
    isAlive: true,
    name: 'un mumakil',
    damage: 130,
  };

  const troll: Character = {
    hp: 200,
    isAlive: true,
    name: 'un troll',
    damage: 115,
  };

  const saruman: Character = {
    hp: 500,
    isAlive: true,
    name: 'Saruman',
    damage: 150,
    dodge: 0.25
  };

  const gollum: Character = {
    hp: 35,
    isAlive: true,
    name: 'Gollum',
    damage: 40,
    dodge: 0.35
  };

  const urukHai: Character = {
    hp: 115,
    isAlive: true,
    name: 'un uruk-hai',
    damage: 50,
    dodge: 0.13
  };

  const lenguaDeSerpiente: Character = {
    hp: 60,
    isAlive: true,
    name: 'Lengua de serpiente',
    damage: 30,
    dodge: 0.27
  };

  const bocaDeSauron: Character = {
    hp: 100,
    isAlive: true,
    name: 'Boca de Sauron',
    damage: 50,
    dodge: 0.18
  };

  const ellaLarania: Character = {
    hp: 250,
    isAlive: true,
    name: 'Ella-Laraña',
    damage: 120,

  };

  const trasgo: Character = {
    hp: 40,
    isAlive: true,
    name: 'un trasgo',
    damage: 25,
    dodge: 0.22
  };

  const balrog: Character = {
    hp: 500,
    isAlive: true,
    name: 'un balrog',
    damage: 150,
  };

export const personajesBienObjetos: Character[] = [
    aragorn,
    legolas,
    gimli,
    frodo,
    boromir,
    gandalf,
    ent,
    theoden,
    eomer,
    gwaihir,
    sam,
    montaraz,
    numenoreano,
    espectro,
    radagast
  ];
export const personajesMalObjetos: Character[] = [
    orco,
    nazgul,
    sauron,
    haradrim,
    mumakil,
    troll,
    saruman,
    gollum,
    urukHai,
    lenguaDeSerpiente,
    bocaDeSauron,
    ellaLarania,
    trasgo,
    balrog
  ];
