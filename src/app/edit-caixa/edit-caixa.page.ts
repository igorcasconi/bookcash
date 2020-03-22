import { ActivatedRoute } from '@angular/router';
import { CaixaService } from './../caixa.service';
import { ToastController, NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Caixa } from '../caixa';

@Component({
  selector: 'app-edit-caixa',
  templateUrl: './edit-caixa.page.html',
  styleUrls: ['./edit-caixa.page.scss'],
})
export class EditCaixaPage implements OnInit {
  caixa: Caixa;
  id: number;
  title: string
  mensagem: string;
  constructor(
    private toast: ToastController,
    private navCtrl: NavController,
    private caixaService: CaixaService,
    private route: ActivatedRoute
  ) { 

    this.caixa = new Caixa();

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.title = "Editar Livro Caixa";
      this.mensagem = 'Altere o nome do seu Caixa para o que desejar!';
      this.caixaService.get(this.id)
      .then((result: any) => {
          this.caixa = result;
      });
    } else {
      this.title = "Novo Livro Caixa";
      this.mensagem = 'Crie o nome do seu novo Caixa!';
    }

  }

  ngOnInit() {
  }

  voltarPagina() {
    this.navCtrl.navigateRoot('/home');
  }

  save() {
    this.saveProduct()
      .then(() => {
        this.presentToast("Caixa foi salva com sucesso!");
        this.navCtrl.navigateRoot('/home');
      })
      .catch(() => {
        this.presentToast("Erro ao inserir novo Caixa!");
        
      });
  }

  private saveProduct() {
    if (this.caixa.Caixa_id) {
      return this.caixaService.update(this.caixa);
    } else {
      return this.caixaService.insert(this.caixa), this.caixaService.insertCaixaSaldo();
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
