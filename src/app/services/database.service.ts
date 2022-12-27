// import { Exam } from './../models/exam.model';
// import { Injectable } from '@angular/core';
// import { Plugins } from '@capacitor/core';
// import '@capacitor-community/sqlite';
// import { JsonSQLite } from '@capacitor-community/sqlite';
// import { BehaviorSubject } from 'rxjs';
// import { AlertController } from '@ionic/angular';
// import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
// const { CapacitorSQLite, Device, Storage } = Plugins

// const DB_SETUP_KEY = 'fisrt_db_setup';
// const DB_NAME_KEY = 'db_name';

// @Injectable({
//   providedIn: 'root'
// })
// export class DatabaseService {

//   constructor(private sqlite: SQLite) { }

// // this.sqlite.create({
// //     name: 'data.db',
// //     location: 'default'
// //   })
// //   .then((db: SQLiteObject) => {


// //     db.executeSql('create table danceMoves(name VARCHAR(32))', [])
// //       .then(() => console.log('Executed SQL'))
// //       .catch(e => console.log(e));


// //   })
// //   .catch(e => console.log(e));


//   public create(item: Exam) {
//   let sqlText;
//   let values;

//   sqlText = "INSERT INTO exams (score , course ,semester) VALUES (?,?,?)";
//   values = [item.score || null, item.course || null, item.semester || null]

//   return this.database.executeSql(sqlText, values);
// }

//   public update(item: Exam) {
//   let sqlText;
//   let values;

//   sqlText = "UPDATE exams SET (score , course , semester ) = ( ? , ? , ? ) where id = ? ;";
//   values = [item.score || null, item.course || null, item.semester || null, item.id]

//   return this.database.executeSql(sqlText, values);

// }

//   public remove(id: number) {
//   let sqlText;
//   let values;
//   sqlText = `delete from exams where id = ? `;
//   values = [id || null]
//   return this.database.executeSql(sqlText, values);
// }

//   public list() {
//   let sqlText;
//   let values: never[] = [];
//   sqlText = `select * from exams `;
//   return this.database.executeSql(sqlText, values);
// }
// }
