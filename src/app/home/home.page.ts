import { CaixaService } from './../caixa.service';
import { Caixa } from './../caixa';
import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  caixas: Caixa[] = [];
  caixa: Caixa;
  id: number;
  private loading;

  constructor(
    public navCtrl: NavController, 
    private toast: ToastController, 
    private caixaService: CaixaService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) { 

    this.caixa = new Caixa();
    
   }

  ionViewDidEnter() {
    this.presentLoading();
  }

  public getAllCaixas(){
    this.caixaService.getAll()
      .then((result: any[]) => {
        this.caixas = result;
        console.log(this.caixas);
      }).catch((e) => console.error(e));
  }

  async addCaixa() {
    this.navCtrl.navigateRoot('/edit-caixa');
  }

  async editCaixa(id: number) {
    this.navCtrl.navigateRoot('/edit-caixa/'+ id);
  }

  public MovimentacaoCaixa(id?: number, title?: string): any {
    this.navCtrl.navigateRoot(['/tabs']);

    sessionStorage.setItem('IdCaixa', id.toString());
    sessionStorage.setItem('TituloCaixa', title);

  }

  async alertRemoveCaixa(caixa: Caixa) {
    let alert = await this.alertCtrl.create({
      header: 'Excluir Caixa',
      message: 'Deseja realmente excluir o Livro Caixa Selecionado?',
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
    this.caixaService.remove(caixa.Caixa_id)
      .then(() => {
        this.presentToast('Livro Caixa Removido com Sucesso');
        this.getAllCaixas();
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
      this.getAllCaixas();
    },1500);
  }

  pageAbout() {
    this.navCtrl.navigateRoot(['/about']);
  }

}
