import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  constructor(private heroesService: HeroesService) { }

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl(''),
    publisher: new FormControl(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publisher = [
    {
      id: 'DC Comics',
      value: 'DC-Comics'
    },

    {
      id: 'Marvel Comics',
      value: 'Marvel-Comics'
    },
  ];

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit(): void {
    // si el formulario no es valido no haremos nada
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          // TODO: mostrar la snackbar
        });

      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        // TODO: mostrar snackbar y redirigir a /heroes/edit/hero.id
      })
  }
}
