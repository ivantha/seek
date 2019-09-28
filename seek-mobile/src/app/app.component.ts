import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.afAuth.user.subscribe(user => {
                if (user) {
                    this.router.navigate(['/']);
                } else {
                    this.router.navigate(['/signin']);
                }
            }, err => {
                this.router.navigate(['/signin']);
            }, () => {
                this.splashScreen.hide();
            });
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logout() {
        this.authService.doLogout()
            .then(res => {
                this.router.navigate(['/signin']);
            }, err => {
                console.log(err);
            });
    }
}
