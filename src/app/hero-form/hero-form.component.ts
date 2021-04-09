import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero, HeroUniverse } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit{

  //input hero recebe o heroi para a criação ou atualização, de acordo com a tela de presença do atributo id
  @Input() hero!: Hero;
  // Output heroSaved ira ser emitido depois que o heroi for atualizado
  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();
  // Output goBack será emitido quando o usuario decidir voltar
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  heroUniverse: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL]

  formGroup: FormGroup

  constructor(
    private heroService: HeroService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      name: [this.hero.name, [Validators.required]],
      id: [this.hero.id],
      description: [this.hero.description],
      image: [this.hero.imageUrl, [Validators.required, Validators.pattern(' *?https{0,1}:\/\/w{0,3}.*| *?ftp:\/\/w{0,3}.*| *?\n')]],
      universe: [this.hero.universe]
    });
  }

  onGoBack(): void {
    this.goBack.emit();
  }
  save(): void {
    let hero: Hero = this.formGroup.value;
    if (hero.id) {
      this.heroService.updateHero(hero)
      .subscribe(() => this.heroSaved.emit());
    } else {
      this.heroService.addHero(hero)
      .subscribe(() => this.heroSaved.emit());
    }
  }
}
