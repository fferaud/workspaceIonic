import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Native Components
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


const DATABASE_FILENAME: string = 'data.db';

@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html'
})
export class SqlitePage {

  private db: SQLiteObject;

  titleMovie:string;
  descMovie:string;
  evalMovie:number;
  categoryMovie:string;

  movies: string[] = []; 

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.createDatabaseFile();
  }

  private createDatabaseFile() :void {
    this.sqlite.create({
      name: DATABASE_FILENAME,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      console.log('Bdd créée');
      this.db = db;
      this.createTables();
    })
    .catch(e => console.log(e));
  }

  private createTables(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS`Movies` ( `idMovie` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `eval` INTEGER NOT NULL DEFAULT 3, `desc` TEXT, `idCategory` INTEGER, FOREIGN KEY(`idCategory`) REFERENCES `Categories`(`idCategory`) )', {} as any)
    .then(() => {
      console.log('Table Movies created !');
      this.db.executeSql('CREATE TABLE IF NOT EXISTS `Categories` ( `idCategory` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL )', <any>{})
      .then(() => console.log('Table Categories created !'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  public saveMyFilm() : void {
    console.log(this.titleMovie);
    console.log(this.evalMovie+'/5');
    console.log(this.descMovie);
    console.log(this.categoryMovie);

    // INSERT INTO `Categories` (name) values ('Test');
    // INSERT INTO `Movies` (name, eval, desc, idCategory) values ('Nom film', 5, 'Description',1);

    this.db.executeSql('INSERT INTO `Categories` (name) values (\''+this.categoryMovie+'\')', {} as any)
    .then(() => {
      console.log('Category inserted');
      this.db.executeSql('INSERT INTO `Movies` (name, eval, desc, idCategory) values (\''+this.titleMovie+'\', '+this.evalMovie+', \''+this.descMovie+'\', last_insert_rowid())', <any>{})
      .then(() => console.log('Movie inserted !'))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));

  }

  public retrieveMovies() {
    this.movies = [];
    this.db.executeSql('Select name from `Movies`', {} as any)
    .then((data) => {
      if(data == null) {
        return ;
      }

      if(data.rows) {
        if(data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            this.movies.push(data.rows.item(i).name);
            
          }
        }
      }
      
    })
    .catch(e => console.log(e));
  }

}
