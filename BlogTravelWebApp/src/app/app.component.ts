import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AuthorizationService } from './services/authorization.service';
import { AppConfig } from "../environments/app-config";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UserLoggedService } from './services/user-logged.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rotateIn } from 'ng-animate';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [MatIconRegistry],
  // providers: [UserLoggedService],
  animations: [
    trigger('rotateIn', [transition('* => *', useAnimation(rotateIn))])
  ],
})
export class AppComponent {
  rotateIn = false;
  title = 'Blog da thais';
  mobile: boolean;
  showSearch: boolean;
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
    .addSvgIcon('facebook_blue', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/redes-sociais/facebook_blue.svg')) 
    .addSvgIcon('twitter_blue', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/redes-sociais/twitter_blue.svg')) 
    .addSvgIcon('facebook_black', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/redes-sociais/facebook_black.svg')) 
    .addSvgIcon('whatsapp', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/redes-sociais/whatsapp.svg'))

    .addSvgIcon('Viagem-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Viagem.svg'))
    .addSvgIcon('Viagens-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Viagem.svg'))
    .addSvgIcon('Intercâmbio-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Intercambio.svg'))
    .addSvgIcon('Intercambio-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Intercambio.svg'))
    .addSvgIcon('Entretenimento-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Entretenimento.svg'))
    .addSvgIcon('Livros-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Livros.svg'))    
    .addSvgIcon('Livro-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Livros.svg'))    
    .addSvgIcon('Moda-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Moda.svg'))    
    .addSvgIcon('Música-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Musica.svg'))    
    .addSvgIcon('Musica-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Musica.svg'))    
    .addSvgIcon('Nutrição-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Nutricao.svg'))    
    .addSvgIcon('Nutricao-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Nutricao.svg'))  
    .addSvgIcon('Youtube-search', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Youtube.svg'))
    .addSvgIcon('Hashtag', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/search/Hashtag.svg'))  

    

    if (localStorage.getItem(AppConfig.auth_token)) {
      this.authorizationService.verifyToken(localStorage.getItem(AppConfig.auth_token)).subscribe(result => {
        if (!result){
            this.clearLocalStorage();
            this.userLoggedService.logged$.next(false);
        }

    }, error => {
        this.clearLocalStorage();
        this.userLoggedService.logged$.next(false);
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
    $('#sidenav').css('position', '');
  }

  blockMenu() {
    $('#menu-mobile').css('display', 'none');
    $('#sidenav').css('position', 'fixed');
  }

  activeMenu(){
    $('#menu-mobile').css('display', 'block');
    $('#sidenav').css('position', '');
  }

  animate(name: 'string') {
    this[name] = !this[name];
    this.showSearch = !this.showSearch;
  }

  selectedList() {
    this.showSearch = !this.showSearch;
  }



  
}

