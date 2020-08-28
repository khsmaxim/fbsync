import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    public authFire:AngularFireAuth,
    public router:Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  async login() {
    let that = this;
    this.authFire.signInWithPopup(new auth.GoogleAuthProvider()).then(function(result) {
      that.user = result.user;
      localStorage.setItem('user', JSON.stringify(that.user));
      that.router.navigate(['/editor']);
    });
  }

  get id():string {
    return Md5.hashStr(this.user.email, false).toString();
  }

  get valid():boolean {
    return this.user !== null;
  }

  async logout() {
    await this.authFire.signOut();
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
