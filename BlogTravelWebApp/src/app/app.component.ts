import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { AuthorizationService } from './services/authorization.service';
import { AppConfig } from "../environments/app-config";
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { UserLoggedService } from './services/user-logged.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  viewProviders: [MdIconRegistry]
})
export class AppComponent {
  title = 'Blog da thais';

  //icones adicionados
  constructor(http: Http, iconReg: MdIconRegistry, sanitizer: DomSanitizer, private router: Router, private authorizationService: AuthorizationService,
             private snackBar: MdSnackBar, private userLoggedService: UserLoggedService) {
    iconReg.addSvgIcon('Viagem', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Viagem.svg'))
    .addSvgIcon('Viagens', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Viagem.svg')) 
    .addSvgIcon('Intercâmbio', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Intercambio.svg'))
    .addSvgIcon('Intercambio', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Intercambio.svg'))
    .addSvgIcon('Entretenimento', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Entretenimento.svg'))
    .addSvgIcon('Livros', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Livros.svg'))    
    .addSvgIcon('Livro', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Livros.svg'))    
    .addSvgIcon('Moda', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Moda.svg'))    
    .addSvgIcon('Música', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Musica.svg'))    
    .addSvgIcon('Musica', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Musica.svg'))    
    .addSvgIcon('Nutrição', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Nutricao.svg'))    
    .addSvgIcon('Nutricao', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Nutricao.svg'))  
    .addSvgIcon('Youtube', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/categories/Youtube.svg')) 

    

    if (localStorage.getItem(AppConfig.auth_token)) {
      this.authorizationService.verifyToken(localStorage.getItem(AppConfig.auth_token)).subscribe(result => {
        if (!result){
            this.clearLocalStorage();
            this.userLoggedService.userLogged(false);
        }

    }, error => {
        this.clearLocalStorage();
        this.userLoggedService.userLogged(false);
        this.router.navigateByUrl(AppConfig.defaultRoute);
        this.snackBar.open("Seu token expirou!", "", { duration: 6000 });
      });
    }

  }

  clearLocalStorage() {
    localStorage.removeItem(AppConfig.auth_token);
    localStorage.removeItem(AppConfig.auth_context);
  }
}

