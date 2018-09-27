import { Injectable } from '@angular/core';

import { RequestService } from '../request/request.service';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(private _requestService: RequestService) { }

    buscarMateria(idMateria: number){
        return this._requestService.requestMethod(`news/Get/Full/${idMateria}`, "GET", true, true, null);
    };

    inscreverNewsletter(data: Object){
        return this._requestService.requestMethod("newsletter/api/newsletter", "POST", true, true, null, data);
    };

    fileUpload(file: FormData) {
        return this._requestService.requestMethod("filesystem/upload/file", "POST", true, true, null, file);
    }
}
