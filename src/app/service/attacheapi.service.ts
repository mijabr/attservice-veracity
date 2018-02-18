import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './auth.service';
import { IViewModelModel, IPropertyModel }from './../model/viewmodel.model';
import './meta.mock.xml';
import './odata_layout.json';
var publicPath = require('./../../../config/publicPath');

@Injectable()
export class AttacheApiService {
    constructor(private http: Http,
        private authService: AuthService) {
    }

    createRequestOptions(): RequestOptions {
        return new RequestOptions({ headers: this.createHeader() });
    }

    createHeader(): Headers {
        var header = new Headers({ 'Content-Type': 'text/html' });
        this.addAuthorisationHeader(header);
        return header;
    }

    addAuthorisationHeader(headers: Headers): void {
        headers.append('Authorization', 'Basic ' + btoa(this.authService.getUsernamePassword()));
    }

    getMetadata(): Observable<string> {
        if (process.env.ENV === 'production') {
            return this.http.get("odata/SAMPLE_DATA/$metadata", this.createRequestOptions())
                .map(response => <string>response.text());
        }
        else {
            return this.http.get("assets/meta.mock.xml").map(response => <string>response.text());
        }
    }

    getModels() : Observable<Array<IViewModelModel>> {
        var subject = new Subject<Array<IViewModelModel>>();
        this.getMetadata().subscribe(response => this.nextMeta(response, subject))
        return subject;
    }

    getDefaultLayout() : Observable<string> {
        return this.http.get(publicPath.make("assets/odata_layout.json")).map(response => <string>response.text());
    }

    private nextMeta(response: string, subject : Subject<Array<IViewModelModel>>): void {
        var xml = response.replace(new RegExp('edmx:', 'g'), '');
        try {
            require('xml2js').parseString(xml, { mergeAttrs: true }, function (err: any, result: any) {
                var models : Array<IViewModelModel> = [];
                for (var entity of result.Edmx.DataServices[0].Schema[0].EntityType) {
                    var props: Array<IPropertyModel> = [];
                    for (var prop of entity.Property) {
                        props.push({ Name: prop.Name[0], Type: prop.Type.toString().split('.').pop() });
                    }
                    var config = { row: 1, col: 1, sizex: 1, sizey: 1 };
                    models.push({ Name: entity.Name[0], Properties: props, Config: config });
                }
                subject.next(models);
            }.bind(this));
        } catch (error) {
            console.log(error);
        }
    }
}