// Core components
import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
import { NewsApiGlobal } from '../models/newsapi-global.model';

@Injectable()
export class NewsApiService {

    private baseUrl: string = 'https://newsapi.org/v2/top-headlines';
    private apiKey: string = '9c6f4ca9f16e48569b0b417d49533c7c';
    private source: string = 'reddit-r-all';
    
    constructor(private http: Http) { }

    public getArticles(): Promise<any> {
		const url = `${this.baseUrl}?apiKey=${this.apiKey}&sources=${this.source}&sortBy=latest`;
        
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as NewsApiGlobal)
        .catch(error => console.log('Une erreur est survenue ' + error))
    }

}