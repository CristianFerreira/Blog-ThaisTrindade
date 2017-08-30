import { environment } from '../environments/environment';

export const AppConfig = {
    appName: "blog-travel",
    version: "0.0.1",
    auth_token: "blog_travel_token",
    auth_context: "blog_travel_contexto",
    auth_app_session: "blog_travel_app_session",
    defaultRoute: "/",
    excludeAuthenticationRoute: ["/altera-senha"],
    serviceProdConfig: {
        rootServiceRoute: "http://thaistrindade.com/",
        habilitarDepuracaoRequisicoes: false
    },
    serviceDevConfig: {
        rootServiceRoute: "http://localhost:3000/",
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
                AuthorAuthenticate: AppConfig.serviceInfo().rootServiceRoute + "api/author/authenticate",
                AuthorVerifyToken: AppConfig.serviceInfo().rootServiceRoute + "api/author/verify-token"
            },
            post: {
                getAll: AppConfig.serviceInfo().rootServiceRoute + "api/post",
                getInactive: AppConfig.serviceInfo().rootServiceRoute + "api/post/Inactive",
                create: AppConfig.serviceInfo().rootServiceRoute + "api/post",
                update: AppConfig.serviceInfo().rootServiceRoute + "api/post",
                getById: AppConfig.serviceInfo().rootServiceRoute + "api/post",
                getByTag: AppConfig.serviceInfo().rootServiceRoute + "api/post/tag",
                getAllTags: AppConfig.serviceInfo().rootServiceRoute + "api/post/tags/getAll/",
                getByCategory: AppConfig.serviceInfo().rootServiceRoute + "api/post/categoria",
                getAllContinents: AppConfig.serviceInfo().rootServiceRoute +  "api/post/continents/getAll/",
                getByContinent: AppConfig.serviceInfo().rootServiceRoute +  "api/post/continent",
                delete: AppConfig.serviceInfo().rootServiceRoute + "api/post",
            }
        };
    }
};
