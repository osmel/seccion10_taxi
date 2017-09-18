import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, AlertController } from 'ionic-angular';

//slides
//podemos usar todos los elementos del ciclo de vida de un componente de angular. Ejemplo AfterViewInit
import { ViewChild,AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';


import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage implements AfterViewInit { //implementamos a AfterViewInit para aprovechar el elemento del ciclo de vida de un componente
	clave:string = "osmel-1";
  
   @ViewChild(Slides) slides: Slides;  //creamos una variable "slides" para relacionarla con los slides	
  constructor(public navCtrl: NavController, 
  	
  	private provUsuario:UsuarioProvider,

  	      private loadingCtrl: LoadingController,
              private alertCtrl: AlertController ) {
  	
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true); //bloquear 
    this.slides.freeMode=false; //que no este libre
    this.slides.paginationType = "progress"; //paginacion de tipo barra de progreso  
  }

continuar(){  //validar el usuario, si la clave es valida
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });

    loading.present(); //comienza el loading

    // Verificar si la clave es valida
    this.provUsuario.verifica_usuario( this.clave )
        .then( valido =>{

          loading.dismiss();  //stop loading

          if( valido ){ // continuar a la siguiente pantalla (true)
            this.slides.lockSwipes(false); //desbloquear la pantalla
            this.slides.slideNext();   //deslizamos el slide a la sig pantalla
            this.slides.lockSwipes(true);  //y bloqueamos nuevamente para que no se muevaS 

          }else{  //no puede continuar a la sig pantalla(false)

            this.alertCtrl.create({ //creamos y mostramos la alerta
              title: "Clave no es correcta",
              subTitle: "Por favor verifique su clave, o hable con el adminsitrador",
              buttons: ["Ok!"]
            }).present();

          }



        })
        .catch( error=>{ //en caso de q falle la promesa
            loading.dismiss();
            console.log("ERROR en verifica_usuario: " + JSON.stringify( error ));
        })

  }


ingresa(){  //ir al home
  
}

}
