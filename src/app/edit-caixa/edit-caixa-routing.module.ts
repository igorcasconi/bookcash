import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCaixaPage } from './edit-caixa.page';

const routes: Routes = [
  {
    path: '',
    component: EditCaixaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCaixaPageRoutingModule {}
