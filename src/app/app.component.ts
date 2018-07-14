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
            .subscribe(res => {
                if(res.success){
                    console.log('materia res: ', res);
                }else{
                    console.log('materia error res: ', res);
                }
            }, error => {
                console.log('materia error: ', error);
            });
    }
}
