import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from "../../providers/usuario/usuario";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	//lat: number = 51.678418;
  	//lng: number = 7.809007;
  	title:string="mi mapa";

  	usuario:any = {};

  constructor(public navCtrl: NavController,
  			public ubicProveedor:UbicacionProvider,
  			public provUser:UsuarioProvider	
  	) {

  	this.ubicProveedor.iniciar_localizacion();

 


    this.ubicProveedor.iniciar_localizacion();
    this.ubicProveedor.usuario
          .subscribe( data=>{
            console.log(data);
            this.usuario = data;
      })
  }

  salir(){

    this.provUser.borrar_usuario();  //destruir la clave y guardarlo en el storage para que deje de existir
    this.ubicProveedor.detener_watch(); //detener suscripcion
    this.navCtrl.setRoot("LoginPage");

  }

}

