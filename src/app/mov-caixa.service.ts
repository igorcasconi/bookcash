import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Caixa } from './caixa';

@Injectable({
  providedIn: 'root'
})
export class MovCaixaService {

  constructor(
    private dbService: DatabaseService
  ) { }

  public getAllMov(id: number, mov: number) {
    return this.dbService.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'select * from Movimentacao_Caixa \
      where Movimentacao_Caixa_Caixa_id = ? AND Movimentacao_Caixa_Tipo_Movimentacao_id = ? ORDER BY Movimentacao_Caixa_date DESC';
      let data = [id, mov];

      return db.executeSql(sql, data)
        .then((data: any) => {
          if (data.rows.length > 0) {
            let caixa: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var cx_item = data.rows.item(i);
              caixa.push(cx_item);
              
            }
            return caixa;
          } else {
            return [];
          }
        }).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  public getCaixaSaldo(id: number) {
    return this.dbService.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'select * from Caixa_Saldo where Caixa_Saldo_Caixa_id = ?';
      let data = [id];

      return db.executeSql(sql, data)
        .then((data: any) => {
          if (data.rows.length > 0) {
            let saldo: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var sd_item = data.rows.item(i);
              saldo.push(sd_item);
              
            }
            return saldo;
          } else {
            return [];
          }
        }).catch((e) => console.error(e));
    }).catch((e) => console.error(e));
  }

  public insertMov(caixa: Caixa, mov: number) {
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into Movimentacao_Caixa (Movimentacao_Caixa_product, \
        Movimentacao_Caixa_Value,Movimentacao_Caixa_date,Movimentacao_Caixa_Caixa_id, \
        Movimentacao_Caixa_Tipo_Movimentacao_id) values (?,?,?,?,?)';
        let data = [caixa.Movimentacao_Caixa_product,caixa.Movimentacao_Caixa_value,caixa.Movimentacao_Caixa_date,caixa.Caixa_id,mov];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public removeMov(id: number) {
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Movimentacao_Caixa where Movimentacao_Caixa_id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public SomaSaldo(caixa?: Caixa, mov_value?: number, id?: number) {
    if(!caixa.Caixa_id) {
      caixa.Caixa_id = id;
      caixa.Movimentacao_Caixa_value = mov_value;
    }
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Caixa_Saldo set Caixa_Saldo_value = Caixa_Saldo_value + ? where Caixa_Saldo_Caixa_id = ?';
        let data = [caixa.Movimentacao_Caixa_value, caixa.Caixa_id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public SubtraiSaldo(caixa?: Caixa, mov_value?: number, id?: number) {
    if(!caixa.Caixa_id) {
      caixa.Caixa_id = id;
      caixa.Movimentacao_Caixa_value = mov_value;
    }
    
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Caixa_Saldo set Caixa_Saldo_value = Caixa_Saldo_value - ? where Caixa_Saldo_Caixa_id = ?';
        let data = [caixa.Movimentacao_Caixa_value, caixa.Caixa_id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
