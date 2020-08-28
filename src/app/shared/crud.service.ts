import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

import { AuthService } from  '../auth/auth.service';
import { Entry } from '../shared/entry';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  entryRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.entryRef = db.object('/entries/' + this.authService.user.uid);
  }

  write(entry: Entry) {
    this.entryRef.update({
      html: entry.html
    })
  }

}
