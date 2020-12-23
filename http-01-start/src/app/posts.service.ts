import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Post } from "./post.model";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content, id: '' };
        return this.http.post<{ name: string }>('https://test-project-786786-default-rtdb.firebaseio.com/posts.json', postData);
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://test-project-786786-default-rtdb.firebaseio.com/posts.json'
            , {
                // headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
                // params: new HttpParams().set('print', 'pretty').set('test', 'test1'),
            })
            .pipe(map(responseData => {
                const postArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArray.push({ ...responseData[key], id: key });
                    }
                }
                return postArray;
            }));
    }

    deleteAllPosts() {
        return this.http.delete('https://test-project-786786-default-rtdb.firebaseio.com/posts.json');
    }
}