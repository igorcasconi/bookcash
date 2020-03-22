import { Tab2Page } from './../tab2/tab2.page';
import { Tab1Page } from './../tab1/tab1.page';
import { HomePage } from './../home/home.page';
import { NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  title: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    this.title = sessionStorage.TituloCaixa;
  }

  ngOnInit() {


  }

  voltarPagina() {
    this.navCtrl.navigateRoot('/home');
  }
}
