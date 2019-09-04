import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseService {
    protected baseUrl: string = 'assets/Json';

    constructor(protected http: HttpClient) { }

    protected defaultHeader(): Headers {
        // create authorization header with jwt token
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        //headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
        return headers;
    }

    // private helper methods
    protected jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers();
        if (currentUser && currentUser.token) {
            headers.append("Authorization", "Bearer " + currentUser.token);
        }
        headers.append("Content-Type", "application/json");
        //headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
        return new RequestOptions({ headers: headers });
    }
}