import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class='row'>
    <div class="col s12 m4 offset-m4">
    <div class="card hoverable">
      <div class="card-content center">
        <span class="card-title">Page de connexion</span>
        <p><em>{{message}}</em></p>
      </div>
            <form #loginForm="ngForm">
          <div>
                    <label for="name">Name</label>
            <input type="text" id="name" [(ngModel)]="name" name="name" required>
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" required>
          </div>
        </form>
      <div class="card-action center">
        <a (click)="login()" class="waves-effect waves-light btn"  *ngIf="!auth.isLoggedIn">Se connecter</a>
        <a (click)="logout()" *ngIf="auth.isLoggedIn">Se déconnecter</a>
      </div>
    </div>
    </div>
    </div>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit{
  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  name: string;
  password: string;
  auth : AuthService
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.auth = this.authService
  }
  // Informe l'utilisateur sur son authentfication.
  setMessage() {
    this.message = this.authService.isLoggedIn ?
      'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
  }

  // Connecte l'utilisateur auprès du Guard
  login() {
    this.message = 'Tentative de connexion en cours ...';
    this.authService.login(this.name, this.password).subscribe((isLoggedIn: boolean) => {
      this.setMessage();
      if (this.auth.isLoggedIn) {
        // Récupère l'URL de redirection depuis le service d'authentification
        // Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
        let redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/pokemons';
        // Redirige l'utilisateur
        this.router.navigate([redirect]);
      } else {
        this.password = '';
      }
    });
  }

  // Déconnecte l'utilisateur
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
