import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Hero, HeroUniverse } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent{

  //input hero recebe o heroi para a criação ou atualização, de acordo com a tela de presença do atributo id
  @Input() hero!: Hero;
  // Output heroSaved ira ser emitido depois que o heroi for atualizado
  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();
  // Output goBack será emitido quando o usuario decidir voltar
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  heroUniverse: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL]


  constructor(
    private heroService: HeroService
  ) { }

  onGoBack(): void {
    this.goBack.emit();
  }

  save(): void {
    if(this.hero.id){
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.heroSaved.emit())
    }else{
      this.heroService.addHero(this.hero)
      .subscribe(() => this.heroSaved.emit())
    }
  }
}
