import { Injectable } from '@angular/core';

import { RequestService } from '../request/request.service';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(private _requestService: RequestService) { }

    buscarMateria(idMateria: number){
        return this._requestService.requestMethod(`news/Get/Full/${idMateria}`, "GET", true);
    };

    inscreverNewsletter(data: Object){
        return this._requestService.requestMethod("newsletter/api/newsletter", "POST", true, data);
    };
}
