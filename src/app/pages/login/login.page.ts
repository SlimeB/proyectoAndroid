import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
import { Usuario, buscarUsuario } from 'src/app/model/Usuario';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  public usuario: Usuario;
  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }
 
  public ngOnInit(): void {
 
    this.usuario.nombreUsuario = 'atorres@duocuc.cl';
    this.usuario.password = '1234';
  }
  
  public recuperar(): void{
    const navigationExtras: NavigationExtras = {
      state: {}
    };
    this.router.navigate(['/recuperar'], navigationExtras);
  }

  public ingresar(): void {
    const user = buscarUsuario(this.usuario.nombreUsuario);

    if (user){
      if(user.password === this.usuario.password) {
          console.log('Inicio de sesión correcto')
      }else {
        console.log('No inicia sesión')
        this.mostrarMensaje('La contraseña no coincide con el e-mail registrado.')
        return;
      }
    }
    if (!user) {
      console.log('El correo no existe')
      this.mostrarMensaje('El email ingresado no está registrado.')
      return;
    }
    
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: user
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  }
 
  /**
   * 
   *
   * @param mensaje 
   * @param duracion 
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
 
}
