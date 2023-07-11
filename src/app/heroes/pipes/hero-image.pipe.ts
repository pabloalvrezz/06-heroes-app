import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  // metodo que usaremos para saber si el heroe tiene imagen asociada o no
  // en caso de que no, le asignaremos una nosotros
  transform(hero: Hero): string {
    if (!hero.id && !hero.alt_img) {
      return 'assets/no-image.png'
    }

    if (hero.alt_img) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`
  }

}
