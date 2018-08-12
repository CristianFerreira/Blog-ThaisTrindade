import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoadInfoComponent } from '../components/load-info/load-info.component';

import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AppConfig } from "../../environments/app-config";

@Injectable()
export abstract class HttpServiceBaseService {

    private http: Http;
    protected router: Router;
    protected snackBar: MatSnackBar;
    protected dialog: MatDialog;
    protected habilitarDepuracaoRequisicoes: boolean;
    public static loadInfoDialog: MatDialogRef<LoadInfoComponent>;

    constructor(http: Http, router: Router, snackBar: MatSnackBar, dialog: MatDialog) { 
        this.http = http;
        this.router = router;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.habilitarDepuracaoRequisicoes = AppConfig.serviceInfo().habilitarDepuracaoRequisicoes;
    }

    protected getDefaultRequestOptions(): RequestOptions{
        let options = null;
        var token = localStorage.getItem(AppConfig.auth_token);
        var system_context = localStorage.getItem(AppConfig.auth_context);
        if(token && system_context) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('x-access-token', token); 
            // headers.append('X-System_context', ` ${system_context}`); 
            options = new RequestOptions({ headers: headers });
        }
        return options;
    }

    protected get(url: string): Observable<Response> {
        this.requestInterceptor();
        return this.responseIntercept(this.http.get((url), this.getDefaultRequestOptions()));
    }

    protected put(url: string, body: any): Observable<Response> {
        this.requestInterceptor();
        return this.responseIntercept(this.http.put(url, body, this.getDefaultRequestOptions()));
    }

    protected post(url: string, body: any, requestOptions?: RequestOptions): Observable<Response> {
        if(!requestOptions)
            requestOptions = this.getDefaultRequestOptions();
        this.requestInterceptor();
        return this.responseIntercept(this.http.post(url, body, requestOptions));
    }

    protected delete(url: string): Observable<Response> {
        this.requestInterceptor();
        return this.responseIntercept(this.http.delete(url, this.getDefaultRequestOptions()));
    }

    private responseIntercept(obs: Observable<Response>): Observable<Response> {
        return obs.catch(this.onCatch)
                    .do((res: Response) => { 
                        this.onSubscribeSuccess(res); 
                    }, 
                        (error: any) => { 
                            this.onSubscribeError(error); 
                    })
                    .finally(() => { this.onFinally(); });;
    }

    // Ocorre no inicio da requisicao
    private requestInterceptor(): void {
        if(!HttpServiceBaseService.loadInfoDialog){
            HttpServiceBaseService.loadInfoDialog = this.dialog.open(LoadInfoComponent);
        }
    }

    // Ocorre no fim da requisicao
    private responseInterceptor(): void {
        HttpServiceBaseService.loadInfoDialog.close();
        this.logDepuracao("Fechando a conexao", "");
    }

    // Ocorre quando vem resposta e repassa
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    // Ocorre quando vem resposta de sucesso
    private onSubscribeSuccess(res: Response): void {
        this.logDepuracao("sucesso", res);

        if(res.status == 401){
            // aqui vem informacoes de acesso negado
        }
    }

    // Ocorre quando vem resposta de erro
    private onSubscribeError(error: any): void {
        this.logDepuracao("erro", error);
    }
    
    // Ocorre no final da resposta
    private onFinally(): void {
        this.responseInterceptor();
    }

    private logDepuracao(tipo: string, info: any): void {
        if(this.habilitarDepuracaoRequisicoes){
            console.log("<<<< Log Depuracao " + tipo + " >>>>");
            console.log(info);
        }
    }
}
