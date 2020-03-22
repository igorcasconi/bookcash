import { Caixa_Saldo } from './caixa_saldo';
import { Caixa } from './caixa';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CaixaService {
  
  constructor(public dbService: DatabaseService) { }

  public getAll() {
    return this.dbService.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from Caixa inner join Caixa_Saldo on Caixa.Caixa_id = Caixa_Saldo.Caixa_Saldo_Caixa_id', [])
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

  public insert(caixa: Caixa) {
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into Caixa (Caixa_name) values (?)';
        let data = [caixa.Caixa_name];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public insertCaixaSaldo() {
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into Caixa_Saldo (Caixa_Saldo_value,Caixa_Saldo_Caixa_id) values (0,(SELECT MAX(Caixa.Caixa_id) FROM Caixa))';

        return db.executeSql(sql, [])
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Caixa where Caixa_id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let caixa = new Caixa();
              caixa.Caixa_id = item.Caixa_id;
              caixa.Caixa_name = item.Caixa_name;
              console.log(item);
 
              return caixa;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(caixa: Caixa) {
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Caixa set Caixa_name = ? where Caixa_id = ?';
        let data = [caixa.Caixa_name, caixa.Caixa_id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbService.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Caixa where Caixa_id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
