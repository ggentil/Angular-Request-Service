import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    //you can use enviroment variables here, like this:
    //private BASE_API_URL: string = environment.BASE_API_URL;
    private BASE_API_URL: string = "https://myapi.address/";

    private standardizeResponse: boolean = false;

    constructor(private _http: HttpClient) { }

    requestMethod(requestURL: string, method: string, standardizeResponse: boolean, itsInternal: boolean, additionalHeaders: Object, data?: any) {
        this.standardizeResponse = standardizeResponse;

        let header = itsInternal ? 
            //Internal default header
            {"Content-Type": "application/json"}:
            //External default header
            {"Content-Type": "application/json"};

        if(additionalHeaders)
            header = Object.assign(header, additionalHeaders);

        let url = itsInternal ? this.BASE_API_URL + requestURL : requestURL;

        let option = {
            headers: header,
            responseType: "json",
            //observe: "response"
        };

        switch (method.toUpperCase()) {
            case "POST" && data:
                return this.throughPost(url, JSON.stringify(data), option);    
            case "PUT" && data:
                return this.throughPut(url, JSON.stringify(data), option);
            case "DELETE":
                return this.throughDelete(url, option);
            case "GET":
                return this.throughGet(url, option);
            default:
                console.error('ARS error: you must define a method!');
        }
    }

    private throwStandardSuccessResponse(data: any) {
        //set your default return schema here:
        //TO-DO -> TESTAR SE QUANDO DER MERDA PASSA POR AQUI TBM
        return {
            success: true,
            message: null,
            data: data
        };
    }

    private throughPost(url: string, data: string, option?: any) {
        return this._http.post(url, data, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    }

    private throughPut(url: string, data: string, option?: any) {
        return this._http.put(url, data, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    }

    private throughDelete(url: string, option?: any) {
        return this._http.delete(url, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    }

    private throughGet(url: string, option?: any) {
        return this._http.get(url, option)
            .pipe(map(response => {
                return this.standardizeResponse ? this.throwStandardSuccessResponse(response) : response;
            }));
    }
}