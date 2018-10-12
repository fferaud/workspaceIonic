
import { NewsApiSource } from './newsapi-source.model';

export class NewsApiArticle {
    
    sources: NewsApiSource;

    author : string;
    description : string;
    title : string;
    url : string;
    urlToImage : string;
    publishedAt : string;
    content : string;

}