import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    //you can use enviroment variables here, like this:
    //private BASE_API_URL: string = environment.BASE_API_URL;
    //private BASE_API_URL: string = "https://myapi.address/";
    private BASE_API_URL: string = "https://dev.aecweb.com.br/api/";

    private standardizeResponse: boolean = false;

    constructor(private _http: HttpClient) { }

    requestMethod(requestURL: string, method: string, standardizeResponse: boolean, itsInternal: boolean, additionalHeaders: Object, data?: any): any {
        this.standardizeResponse = standardizeResponse;

        let header = itsInternal ? 
            //Internal default header
            {}:
            //External default header
            {};

        header = null;

        if(additionalHeaders)
            header = Object.assign(header, additionalHeaders);

        let url = itsInternal ? this.BASE_API_URL + requestURL : requestURL;

        let option = {
            headers: header,
            responseType: "json",
            //observe: "response"
        };

        console.log("request s: ", data);

        method = method.toLocaleUpperCase();
        if(method == "POST" && data) {
            return this.throughPost(url, this.verifyInstanceFile ? JSON.stringify(data) : data, option);
        } else if(method == "PUT" && data) {
            return this.throughPut(url, this.verifyInstanceFile ? JSON.stringify(data) : data, option);
        } else if(method == "DELETE") {
            return this.throughDelete(url, option);
        } else if(method == "GET") {
            return this.throughGet(url, option);
        } else {
            return this.throwStandardErrorResponse("ARS error: you must define a method!");
        }

    };

    private throwStandardErrorResponse(message: string) {
        return {
            success: false,
            message: message,
            data: null
        };
    };

    private throwStandardSuccessResponse(data: any) {
        //set your default return schema here:
        //TO-DO -> TESTAR SE QUANDO DER MERDA PASSA POR AQUI TBM
        return {
            success: true,
            message: null,
            data: data
        };
    };

    private throughPost(url: string, data: any, option?: any) {
        return this._http.post(url, data, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    };

    private throughPut(url: string, data: string, option?: any) {
        return this._http.put(url, data, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    };

    private throughDelete(url: string, option?: any) {
        return this._http.delete(url, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    };

    private throughGet(url: string, option?: any) {
        return this._http.get(url, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    };

    private verifyInstanceFile(data: any): boolean {
        return data instanceof File || data instanceof FormData ? true : false;
    }
}