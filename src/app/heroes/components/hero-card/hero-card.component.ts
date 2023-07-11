import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { throwError } from 'rxjs';

@Component({
  selector: 'heroes-card',
  templateUrl: './hero-card.component.html',
  styles: [
  ]
})
export class HeroCardComponent implements OnInit {


  ngOnInit(): void {
    if (!this.hero)
      throw Error("Hero property is required")
  }


  @Input()
  public hero!: Hero
}
