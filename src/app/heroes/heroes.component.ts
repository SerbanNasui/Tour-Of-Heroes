import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes', // the component's CSS element selector
  templateUrl: './heroes.component.html', //  the location of the component's template file.
  styleUrls: ['./heroes.component.css'] //the location of the component's private CSS styles.
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
 // selectedHero: Hero;

  //constructor(private heroService: HeroService, private messageService: MessageService) { }
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponentt: Selected hero id=${hero.id}. Hi. I'm ${hero.name}, do you need my help?`);
  // }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  add(name: string): void{
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero);});
  }

  delete(hero: Hero){
    this.heroes = this.heroes.filter(h=>h!==hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
