import { Component, OnInit } from '@angular/core';
import { TestService } from './services/test/test.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    
    title: string = 'app';

    constructor(private _testService: TestService) {}

    ngOnInit() {
        this._testService.buscarMateria(17264)
            .subscribe(response => {
                console.log('materia res: ', response);
            }, error => {
                console.log('materia error: ', error);
            });
    }


    pegarArquivo(files: FileList) {
        console.log("files: , ", files);

        let arquivoEnviado = files.item(0);

        if (arquivoEnviado != null) {
            let regexValidaTipoArquivo = /(\W|^)(doc|docx|xls|xlsx|pdf)(\W|$)/i;
            let file = arquivoEnviado.name.split(".");
            
            let arquivo = {
                nome: file[0],
                tipo: file[1]
            };

            if (!regexValidaTipoArquivo.test(arquivo.tipo)) arquivo.tipo = 'lista';

            this.upload(arquivoEnviado, arquivo.nome);
        }
    }
    upload(arquivo: any, nomeArquivo: string) {
        const fileData = new FormData();
        
        fileData.append('arquivo', arquivo, nomeArquivo);

        console.log("files append: ", fileData);

        this._testService.fileUpload(fileData)
            .subscribe(response => {
                console.log(response);
            }, error => {
                console.log(error);
            });
    }
}
