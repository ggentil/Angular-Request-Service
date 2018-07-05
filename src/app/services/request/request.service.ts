import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private BASE_API_URL: string = environment.BASE_API_URL;
    private internalRequest: boolean = false;

    constructor(private _http: HttpClient) { }

    requestMethod(requestURL: string, method: string, itsInternal: boolean, data?: any) {
        this.internalRequest = itsInternal;

        let header = {"Content-Type": "application/json"};
        let url = itsInternal ? this.BASE_API_URL + requestURL : requestURL;

        let option = {
            headers: header,
            responseType: "json",
            //observe: "response"
        };

        if (method.toUpperCase() == "POST" && data) {
            return this.throughPost(url, JSON.stringify(data), option);
        } else {
            return this.throughGet(url, option);
        }
    }

    private throwObservableSuccess(dataToReturn: any) {
        return {
            success: true,
            message: null,
            data: dataToReturn
        };
    }

    private throughPost(url: string, data: string, option?: any) {
        return this._http.post(url, data, option)
            .pipe(map(response => {
                return this.internalRequest ? response : this.throwObservableSuccess(response);
            }));
    }

    private throughGet(url: string, option?: any) {
        return this._http.get(url, option)
            .pipe(map(response => {
                return this.internalRequest ? response : this.throwObservableSuccess(response);
            }));
    }
}