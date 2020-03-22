import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {


  constructor(private sqlite: SQLite) {  }

  public getDB() {
    return this.sqlite.create({
      name: 'livro_Caixa',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB().then((db: SQLiteObject) => {
      this.createTables(db);
      this.insertDefaultItems(db);
    }).catch(e => console.error(e));
  }

  private createTables(db: SQLiteObject) {
    return db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS `Caixa` ( Caixa_id INTEGER PRIMARY KEY AUTOINCREMENT, Caixa_name VARCHAR(45) NOT NULL)'],
      // tslint:disable-next-line: max-line-length
      ['CREATE TABLE IF NOT EXISTS `Caixa_Saldo` ( Caixa_Saldo_id INTEGER PRIMARY KEY AUTOINCREMENT, Caixa_Saldo_value REAL NOT NULL,\
       Caixa_Saldo_Caixa_id INTEGER NOT NULL, FOREIGN KEY(Caixa_Saldo_Caixa_id) REFERENCES Caixa(Caixa_id))'],
      ['CREATE TABLE IF NOT EXISTS `Movimentacao_Caixa` ( Movimentacao_Caixa_id INTEGER PRIMARY KEY AUTOINCREMENT, Movimentacao_Caixa_product VARCHAR(45) NOT NULL,\
        Movimentacao_Caixa_value REAL NOT NULL, Movimentacao_Caixa_date DATE NOT NULL, Movimentacao_Caixa_Caixa_id INTEGER NOT NULL, \
        Movimentacao_Caixa_Tipo_Movimentacao_id INTEGER NOT NULL, FOREIGN KEY(Movimentacao_Caixa_Caixa_id) REFERENCES Caixa(Caixa_id), \
        FOREIGN KEY(Movimentacao_Caixa_Tipo_Movimentacao_id) REFERENCES Caixa(Tipo_Movimentacao))'],
      ['CREATE TABLE IF NOT EXISTS `Tipo_Movimentacao` ( Tipo_Movimentacao_id INTEGER PRIMARY KEY AUTOINCREMENT, Tipo_Movimentacao_description VARCHAR(45) NOT NULL)']
      ])
      .then(() => console.log('Tabelas criadas')).catch(e => console.error(e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(Tipo_Movimentacao_id) as qtd from Tipo_Movimentacao',[])
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into Tipo_Movimentacao (Tipo_Movimentacao_id,Tipo_Movimentacao_description) values (?,?)', [1,'Entrada']],
          ['insert into Tipo_Movimentacao (Tipo_Movimentacao_id,Tipo_Movimentacao_description) values (?,?)', [2,'Saída']]
        ]).then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }

  

}
