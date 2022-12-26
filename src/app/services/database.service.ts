import { Exam } from './../models/exam.model';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import '@capacitor-community/sqlite';
import { JsonSQLite } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
const { CapacitorSQLite, Device, Storage } = Plugins

const DB_SETUP_KEY = 'fisrt_db_setup';
const DB_NAME_KEY = 'db_name';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dbReady = new BehaviorSubject(false);
  dbName = '';
  constructor(
    // private http: HttpClient,
    private alertCtrl: AlertController
  ) { }

  async init() {
    const info = await Device['getInfo']();

    if (info.platform === 'android') {
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
        this.setupDatabase();
      } catch (e) {
        const alert = await this.alertCtrl.create({
          header: 'No DB Access',
          message: 'This app cannot work without Database access',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      this.setupDatabase();
    }
  }
  private async setupDatabase() {
    const dbSetupDone = await Storage['get']({ key: DB_SETUP_KEY });

    if (!dbSetupDone.value) {
      this.downloadDatabase();
    } else {
      this.dbName = (await Storage['get']({ key: DB_NAME_KEY })).value;
      await CapacitorSQLite['open']({ database: this.dbName });
      this.dbReady.next(true);
    }
  }
  private downloadDatabase(update = false) {
    throw new Error('Method not implemented.');
  }

  public create(item: Exam) {
    let sqlText;
    let values;

    sqlText = "INSERT INTO exams (score , course ,semester) VALUES (?,?,?)";
    values = [item.score || null, item.course || null, item.semester || null]

    return this.database.executeSql(sqlText, values);
  }

  public update(item: Exam) {
    let sqlText;
    let values;

    sqlText = "UPDATE exams SET (score , course , semester ) = ( ? , ? , ? ) where id = ? ;";
    values = [item.score || null, item.course || null, item.semester || null, item.id]

    return this.database.executeSql(sqlText, values);

  }

  public remove(id: number) {
    let sqlText;
    let values;
    sqlText = `delete from exams where id = ? `;
    values = [id || null]
    return this.database.executeSql(sqlText, values);
  }

  public list() {
    let sqlText;
    let values: never[] = [];
    sqlText = `select * from exams `;
    return this.database.executeSql(sqlText, values);
  }
}
