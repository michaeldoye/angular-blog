import { Component, OnInit } from '@angular/core';
import { routeAnimation } from '../../../route.animation';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class LoginPageComponent implements OnInit {

  email: string = '';
  password: string = '';

  hide: boolean = true;
  rememberMe: boolean =  true;

  isLoading: Boolean = false;

  users: Observable<any>;
  usersRef: AngularFireList<any>;  

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private sb: MatSnackBar,
    private ls: LocalStorageService,    
    private router: Router
  ) { }

  ngOnInit() {
    this.logOut();
    this.usersRef = this.db.list('users');
    this.users = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });   
  }

  login() {
    this.isLoading = true;
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(auth => {
        if (auth.uid !== null) {
          this.db.object(`/users/${auth.uid}`).valueChanges().subscribe((data:any) => {
            data.uid = auth.uid;
            this.ls.set('user', data);
            this.router.navigate(['/admin']);
          });
        }
      })
      .catch(error => {
        this.sb.open(error.message, '', {duration: 5000});
        this.isLoading = false;
      });
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => console.log('logged out'));
  }  

}
