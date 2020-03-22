import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarMovimentacaoPage } from './adicionar-movimentacao.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarMovimentacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarMovimentacaoPageRoutingModule {}
