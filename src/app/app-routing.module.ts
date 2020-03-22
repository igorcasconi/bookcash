import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'introducao', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'edit-caixa', loadChildren: () => import('./edit-caixa/edit-caixa.module').then( m => m.EditCaixaPageModule) },
  { path: 'edit-caixa/:id', loadChildren: () => import('./edit-caixa/edit-caixa.module').then( m => m.EditCaixaPageModule) },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'add-movimentacao', loadChildren: () => import('./adicionar-movimentacao/adicionar-movimentacao.module')
  .then( m => m.AdicionarMovimentacaoPageModule)},
  { path: 'about', loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)},
  {
    path: 'introducao',
    loadChildren: () => import('./introducao/introducao.module').then( m => m.IntroducaoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
