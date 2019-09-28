import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FilterModalPageModule} from './filter-modal/filter-modal.module';

import {environment} from '../environments/environment';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {Crop} from '@ionic-native/crop/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FilterModalPageModule,
        FormsModule,
        ReactiveFormsModule,

        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app
        AngularFirestoreModule, // imports firebase/firestore
        AngularFireAuthModule, // imports firebase/auth
        AngularFireStorageModule // imports firebase/storage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ImagePicker,
        Crop,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
