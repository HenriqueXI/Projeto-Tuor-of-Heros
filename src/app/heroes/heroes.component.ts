import { Component, OnInit } from '@angular/core';

import { Hero, HeroGetResponse } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  cursor: string;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();

  }

  getHeroes(): void {

    this.heroService.getHeroes(this.cursor)//ara o serviço agora estamos enviando o cursor como um parametro
    .subscribe(heroesGetResponse => {
      // Aqui temos uma condição para verificar se ao enviar a requisição tinha ou não um cursor
      if (this.cursor) {
        // Se tiver iremos concatenar a lista atual com os novos itens
        this.heroes = this.heroes.concat(heroesGetResponse.heroes);
      } else {
        // Se não tinha cursor iremos somente atribuir
        this.heroes = heroesGetResponse.heroes;
      }
      // E a cada requisição retornada iremos salvar o cursor
      this.cursor = heroesGetResponse.cursor;
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  onScrollDown(){
    if(this.cursor){
      this.getHeroes();
    }
  }

}
