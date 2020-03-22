import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCaixaPageRoutingModule } from './edit-caixa-routing.module';

import { EditCaixaPage } from './edit-caixa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCaixaPageRoutingModule
  ],
  declarations: [EditCaixaPage]
})
export class EditCaixaPageModule {}
