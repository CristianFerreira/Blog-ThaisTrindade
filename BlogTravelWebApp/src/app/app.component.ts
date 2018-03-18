import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AuthorizationService } from './services/authorization.service';
import { AppConfig } from "../environments/app-config";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UserLoggedService } from './services/user-logged.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  viewProviders: [MatIconRegistry]
})
export class AppComponent {
  title = 'Blog da thais';
  mobile: boolean;
  //icones adicionados
  constructor(http: Http, iconReg: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, private authorizationService: AuthorizationService,
             private snackBar: MatSnackBar, private userLoggedService: UserLoggedService) {
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
    .addSvgIcon('twitter_black', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/redes-sociais/twitter_black.svg'))    
    .addSvgIcon('instagram_black', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/redes-sociais/instagram_black.svg'))  
    .addSvgIcon('facebook_black', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/redes-sociais/facebook_black.svg')) 

    

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

    this.mobile = $(window).width() > 700 ? false : true; 

  }

  clearLocalStorage() {
    localStorage.removeItem(AppConfig.auth_token);
    localStorage.removeItem(AppConfig.auth_context);
  }

  check(){
    $('#menu-mobile').css('display', 'block');
  }

  blockMenu() {
    $('#menu-mobile').css('display', 'none');
  }

  activeMenu(){
    $('#menu-mobile').css('display', 'block');
  }
  
}

