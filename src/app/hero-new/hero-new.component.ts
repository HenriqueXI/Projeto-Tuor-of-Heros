import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})
export class HeroNewComponent implements OnInit {

  hero: Hero = {} as Hero;
  constructor(
    private location: Location
  ) { }

  onGoBack(){
    this.location.back();
  }

  onSaved(){
    this.location.back();
  }

  ngOnInit(): void {
  }

}
