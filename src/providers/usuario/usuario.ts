import { Injectable } from '@angular/core';
//import { AngularFireModule } from 'angularfire2'; 
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database'; //, FirebaseListObservable
import { Platform } from "ionic-angular";

//storage
import { Storage } from '@ionic/storage'; 



@Injectable()
export class UsuarioProvider {

    clave:string = null;

  constructor( private af: AngularFireDatabase,
               private platform:Platform,
               private storage: Storage
               ) {}

  

  verifica_usuario( clave:string ){

    clave = clave.toLowerCase(); //minuscula

    let promesa = new Promise( (resolve, reject)=>{  //creo una promesa porq esto es un proceso async que puede demorar

      this.af.list('/usuarios/'+clave )
            .subscribe( data =>{

              if( data.length === 0 ){ // clave no es correcta
                resolve(false);

              }else{ // la clave es válida
                this.clave = clave;
                //this.guardar_storage();
                resolve(true);
              }
				//console.log(data);
				//resolve(true);
            })


    })
    .catch( error=> console.log( "Error en promesa Service: " + JSON.stringify(error) ) );


    return promesa;
  }

  guardar_storage(){

    let promesa = new Promise( ( resolve, reject )=>{

      if(  this.platform.is("cordova")  ){// dispositivo
        this.storage.set('clave', this.clave );

      }else{// escritorio
        console.log("Clave en guardar storage " , this.clave);
        if( this.clave ){
          localStorage.setItem("clave", this.clave);
        }else{
          localStorage.removeItem("clave"); //elimino la clave


          console.log("Clave borrada");
        }

        console.log("Clave LocalStorage? ", this.clave);

      }



    });

    return promesa;

  }


  cargar_storage(){

    let promesa = new Promise( (resolve,reject)=>{

      if( this.platform.is("cordova") ){// dispositivo

        this.storage.ready()
            .then( ()=>{
              // leer del storage
              this.storage.get("clave").then( clave=>{
                this.clave = clave;
                resolve();
              });

            });


      }else{// escritorio
        this.clave = localStorage.getItem("clave");
        resolve();
      }


    });


    return promesa;



  }


  borrar_usuario(){
    this.clave = null; //destruir la clave y guardarlo en el storage para que deje de existir
    this.guardar_storage();
  }



 
}
