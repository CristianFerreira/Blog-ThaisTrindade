import { environment } from './environment';

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
        rootServiceRoute: "http://localhost:4000/",
        habilitarDepuracaoRequisicoes: true
    },
    serviceInfo: () => {
        if(environment.production){
            return AppConfig.serviceProdConfig; 
        }else{
            return AppConfig.serviceDevConfig; 
        }
    },
    serviceWebInfo: () => {
        if(environment.production){
            return "http://thaistrindade.com/#/"; 
        }else{
            return "http://localhost:4200/#/"; 
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
                getInactive: AppConfig.serviceInfo().rootServiceRoute + "api/post/postsInactive/Inactive",
                create: AppConfig.serviceInfo().rootServiceRoute + "api/post",
                update: AppConfig.serviceInfo().rootServiceRoute + "api/post",
                getById: AppConfig.serviceInfo().rootServiceRoute + "api/post/postById",
                getByTag: AppConfig.serviceInfo().rootServiceRoute + "api/post/tag",
                getAllTags: AppConfig.serviceInfo().rootServiceRoute + "api/post/tags/getAll/",
                getTagsMostUsed: AppConfig.serviceInfo().rootServiceRoute + "api/post/tags/getTagsMostUsed/",
                getByCategory: AppConfig.serviceInfo().rootServiceRoute + "api/post/categoria",
                getBySearch: AppConfig.serviceInfo().rootServiceRoute + "api/post/search",
                getAllPostsToSearch: AppConfig.serviceInfo().rootServiceRoute + "api/post/getAllPostsToSearch/search",
                getAllCategories: AppConfig.serviceInfo().rootServiceRoute + "api/post/categories/getAll/",
                getAllContinents: AppConfig.serviceInfo().rootServiceRoute +  "api/post/continents/getAll/",
                getByContinent: AppConfig.serviceInfo().rootServiceRoute +  "api/post/continent",
                delete: AppConfig.serviceInfo().rootServiceRoute + "api/post",
            },
            contactEmail: {
                create: AppConfig.serviceInfo().rootServiceRoute + "api/contactEmail",
            },
            contact: {
                send: AppConfig.serviceInfo().rootServiceRoute + "api/contact",
            }
        };
    }
};
