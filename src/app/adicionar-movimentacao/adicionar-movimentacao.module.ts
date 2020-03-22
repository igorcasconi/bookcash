import { Tab1Page } from './../tab1/tab1.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarMovimentacaoPageRoutingModule } from './adicionar-movimentacao-routing.module';

import { AdicionarMovimentacaoPage } from './adicionar-movimentacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarMovimentacaoPageRoutingModule
  ],
  providers: [],
  declarations: [AdicionarMovimentacaoPage]
})
export class AdicionarMovimentacaoPageModule {}
