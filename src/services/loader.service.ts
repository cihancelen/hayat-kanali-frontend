import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class LoaderService {

    constructor() { }

    public isShowLoader: boolean = false;

    setShowLoader(cond: boolean) {
        this.isShowLoader = cond;
    }
}