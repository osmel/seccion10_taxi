import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { UsuarioProvider } from '../providers/usuario/usuario';


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
   rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private provUsuario:UsuarioProvider) {


      this.provUsuario.cargar_storage()
          .then( ()=>{

            if( this.provUsuario.clave ){
              this.rootPage = HomePage;
            }else{
              this.rootPage = "LoginPage";
            }

            statusBar.styleDefault();
            splashScreen.hide();

          })


  }
}


