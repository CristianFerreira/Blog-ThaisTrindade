import { environment } from '../environments/environment';

export const AppConfig = {
    appName: "blog-travel",
    version: "0.0.1",
    auth_token: "blog_travel_token",
    auth_context: "blog_travel_contexto",
    auth_app_session: "blog_travel_app_session",
    defaultRoute: "/",
    excludeAuthenticationRoute: ["/altera-senha"],
    
    // configuracao para ambiente de desenvolvimento, comando: ng build --prod
    serviceProdConfig: {
        rootServiceRoute: "",
        habilitarDepuracaoRequisicoes: false
    },

    // configuracao para ambiente de desenvolvimento, comando: ng build
    serviceDevConfig: {
        rootServiceRoute: "http://localhost:5000/",
        habilitarDepuracaoRequisicoes: true
    },
    serviceInfo: () => {
        if(environment.production){
            return AppConfig.serviceProdConfig; 
        }else{
            return AppConfig.serviceDevConfig; 
        }
    },
    serviceUrls: () => {
        return {
            Authenticate: {
                Author: AppConfig.serviceInfo().rootServiceRoute + "author/authenticate"
            },
            post: {
                listAll: AppConfig.serviceInfo().rootServiceRoute + "post",
            }
        };
    },
    formMsgs: {
        numeroInvalido: "Número inválido",
        cepInvalido: "CEP inválido",
        selecioneUmaOpcao: "Selecione uma opção.",
        emailInvalido: "E-mail inválido"
    }
};
