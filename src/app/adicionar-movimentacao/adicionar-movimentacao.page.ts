import { MovCaixaService } from './../mov-caixa.service';
import { NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Caixa } from '../caixa';

@Component({
  selector: 'app-adicionar-movimentacao',
  templateUrl: './adicionar-movimentacao.page.html',
  styleUrls: ['./adicionar-movimentacao.page.scss'],
})
export class AdicionarMovimentacaoPage implements OnInit {
  caixa: Caixa;
  id: number;
  mov: number;
  title: string;
  mensagem: string;

  constructor( 
    private toast: ToastController,
    private navCtrl: NavController,
    private movCaixaService: MovCaixaService,
    private route: ActivatedRoute) { 

      this.caixa = new Caixa();

      this.caixa.Caixa_id = Number(sessionStorage.IdCaixa);

      this.route.queryParams.subscribe(params => {
        if(params['mov']){  
          this.mov = Number(params['mov']);
          if(this.mov == 1) {
            this.title = 'Nova Entrada no Caixa';
            this.mensagem = 'Insira sua nova Entrada ao caixa, \
            informando o Produto que está sendo vendido, o valor do produto e data da venda.';
          } else {
            this.title = 'Nova Saída no Caixa';
            this.mensagem = 'Insira sua nova Entrada ao caixa, \
            informando o Produto que está sendo comprado, o valor do produto e data de compra.';
          }
        }
      });
  }

  ngOnInit() {
  }

  voltarPagina() {
    if(this.mov == 1){  
      this.navCtrl.navigateRoot('/tabs/tab1');
    } else {
      this.navCtrl.navigateRoot('/tabs/tab2');
    }
  }

  save(mov: number) {
    
    if(mov == 1) {
      this.saveProduct()
        .then(() => {
          this.presentToast("Entrada foi inserida ao Caixa com sucesso!");
          this.navCtrl.navigateRoot('/tabs/tab1');
        })
        .catch(() => {
          this.presentToast("Erro ao inserir nova Entrada no Caixa!");
        });
    } else {
      this.saveProduct()
      .then(() => {
        this.presentToast("Saída foi inserida ao Caixa com sucesso!");
        this.navCtrl.navigateRoot('/tabs/tab2');
      })
      .catch(() => {
        this.presentToast("Erro ao inserir nova Saída no Caixa!");
      });
    }
  }

  private saveProduct() {
    if(this.mov == 1) {
      return this.movCaixaService.insertMov(this.caixa, this.mov), this.movCaixaService.SomaSaldo(this.caixa);
    } else {
      return this.movCaixaService.insertMov(this.caixa, this.mov), this.movCaixaService.SubtraiSaldo(this.caixa);
    }
  }

  async presentToast(mensagem: string) {
    let toast = await this.toast.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.present();
  }
}
