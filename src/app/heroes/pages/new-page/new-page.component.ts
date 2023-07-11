import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap, filter } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

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

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.heroesService.getHeroById(id)),
      ).subscribe(hero => {
        if (!hero)
          return this.router.navigateByUrl('/')

        this.heroForm.reset(hero)
        return;
      })

  }

  onSubmit(): void {
    // si el formulario no es valido no haremos nada
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackBar(`${hero.superhero} se ha actualizado`)
        });

      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        // TODO: mostrar snackbar y redirigir a /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit/', hero.id])
        this.showSnackBar(`${hero.superhero} se ha creado`)
      })
  }

  // metodo que usaremos para confirmar que el usuario quiere eliminar el heroe
  onDeleteConfirmation(): void {
    if (!this.currentHero.id) throw Error("Hero id is required")

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result === true),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted === true),
      )
      .subscribe(result => {
        this.router.navigate(['/heroes'])
      })


    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return;

    //   this.heroesService.deleteHeroById(this.currentHero.id)
    //     .subscribe(wasDeleted => {
    //       if (wasDeleted)
    //         this.router.navigate(['/heroes'])
    //     })

    // });
  }


  showSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'ok', {
      duration: 2500,
    })
  }
}
