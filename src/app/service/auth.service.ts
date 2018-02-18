import { Component, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    constructor(private http: Http) {
    }

    getUsernamePassword() : string {
        return "SUPERVISOR:QA1234";
    }
}