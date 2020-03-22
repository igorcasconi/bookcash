import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MovCaixaService} from '../mov-caixa.service';
import {Caixa} from "../caixa";

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page{

  id: number;
  MovCaixas: Caixa[] = [];
  caixa: Caixa;
  caixa_saldo: Caixa[] = [];
  saldo: any;
  private loading;

  constructor(
    public route: ActivatedRoute,
    private movCaixaService: MovCaixaService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toast: ToastController,
    private loadingController: LoadingController
  ) {
    this.caixa = new Caixa();
    this.id = Number(sessionStorage.IdCaixa);
  }

  ionViewDidEnter(){
    this.caixa = new Caixa();
    this.id = Number(sessionStorage.IdCaixa);
    this.MovCaixas = [];
    this.presentLoading();
  }


  public getAllMovCaixas(){
    this.movCaixaService.getAllMov(this.id,1)
        .then((result: any[]) => {
          this.MovCaixas = result;
        }).catch((e) => console.error(e));
  }

  public SaldoCaixa(){
    this.movCaixaService.getCaixaSaldo(this.id)
        .then((result: any) => {
          this.caixa_saldo = result;
          this.caixa_saldo.forEach(obj => {
            this.saldo = obj.Caixa_Saldo_value.toFixed(2);
          });
        }).catch((e) => console.error(e));
  }
  async addMovCaixaEntrada(id: number, mov: number) {
    this.navCtrl.navigateRoot('/add-movimentacao', {queryParams: { id: id, mov: mov}});
  }

  async alertRemoveCaixa(caixa: Caixa) {
    let alert = await this.alertCtrl.create({
      header: 'Excluir Caixa',
      message: 'Deseja realmente excluir a Entrada Selecionada?',
      buttons: [{
        text: 'Excluir',
        cssClass: 'danger',
        handler: () => {
          this.excluirCaixa(caixa);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }]
    });
    alert.present();
  }

  excluirCaixa(caixa: Caixa) {
    caixa.Caixa_id = this.id;

    this.movCaixaService.SubtraiSaldo(caixa).then(() => {
    });

    this.movCaixaService.removeMov(caixa.Movimentacao_Caixa_id)
      .then(() => {
        this.presentToast('Entrada Removida do Livro Caixa com Sucesso');
        this.getAllMovCaixas();
        this.SaldoCaixa();
      });
  }

  async presentToast(mensagem: string) {
    let toast = await this.toast.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentLoading() {
    this.loadingController.create({
      message: 'Aguarde...',
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });

    setTimeout(() => {
      this.loading.dismiss();
      this.getAllMovCaixas();
      this.SaldoCaixa();
    },1500);
  }

}
