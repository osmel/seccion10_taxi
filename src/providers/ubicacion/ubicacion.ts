import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database'; //, FirebaseListObservable
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Injectable()
export class UbicacionProvider {
	//usuario: va a ser nuestro taxista, el que se esta moviendo
	usuario: FirebaseObjectObservable<any[]>; //FirebaseListObservable
  	private watch:any;

  constructor(public geo: Geolocation,
  			  private provUsuario:UsuarioProvider,
  			  private af: AngularFireDatabase ) {
		    
		    console.log('Hello UbicacionProvider Provider');

		     if( !this.provUsuario.clave ){
		      return;
		    }

		    //aqui vammos a inicializar cada usuario, con su ruta, tenemos la clave en el otro servicio
		    this.usuario = this.af.object("/usuarios/" + this.provUsuario.clave );

  }


  iniciar_localizacion(){
/* Observable
//que esta pendiente constantemente a los cambios de posiciones
//llamo a la funcion y me regresas las coordenadas o un error pero solo lo hace una vez
*/


    this.watch = this.geo.watchPosition()
                    .subscribe((data) => {
                       // data can be a set of coordinates, or an error (if an error occurred).
                       // data.coords.latitude
                       // data.coords.longitude
                      // console.log(data);
                     
                      if( !this.provUsuario.clave ){ //si el usuario no existe, que no actualice por medida de seguridad mas que nada 
                        return;
                      }
                      //aqui guardamos en firebase la lat,long del usuario, sin hacer historico, más exacto lo que hacemos es actualizar la posicion actual
                       this.usuario.update({ lat: data.coords.latitude, lng: data.coords.longitude  });

                      });

  }

  detener_watch(){
    this.watch.unsubscribe();
  }


/* promesa
//este codigo obtiene la ubicacion en ese momento
//llamo a la funcion y me regresas las coordenadas o un error pero solo lo hace una vez
	this.geo.getCurrentPosition()
	.then((resp) => { 
		 // resp.coords.latitude 
	 	// resp.coords.longitude 
	}).catch((error) => { 
	  	console.log('Error getting location', error); 
	}); 
*/



}
