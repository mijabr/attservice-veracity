import { Component, ApplicationRef } from '@angular/core';
import { IViewModelModel, IPropertyModel } from './model/viewmodel.model';
import { AttacheApiService } from './service/attacheapi.service';
import { NgGridItemEvent } from 'angular2-grid';
import 'xml2js';

@Component({
    selector: 'veracity-app',
    template: require('./veracity.component.html'),
    styles: [require('./veracity.component.css')]
})
export class VeracityComponent {

    models: Array<IViewModelModel> = [];
    getModelsError : boolean = false;
    defaultModelLayout : string = "";
    getDefaultModelLayoutError : boolean = false;

    saveData = function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        return function (data: any, fileName: string) {
            var json = JSON.stringify(data),
                blob = new Blob([json], { type: "octet/stream" }),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    } ();

    constructor(private api: AttacheApiService, private appRef: ApplicationRef) {
    }

    ngOnInit() {
        this.api.getModels().subscribe(response => this.onGetModelNext(response), error => this.getModelsError = true, () => this.onGetModelsComplete());
    }

    onGetModelNext(response : any) {
        this.models = response;
        this.onGetModelsComplete();
    }

    onGetModelsComplete() {
        this.api.getDefaultLayout().subscribe(response => this.defaultModelLayout = response, error => this.getDefaultModelLayoutError = true, () => this.onGetDefaultModelLayoutComplete());
    }

    onGetDefaultModelLayoutComplete() {
        this.updateModelsLayout(this.defaultModelLayout);
    }

    saveLayout() {
        this.saveData(this.models, "odata_layout.json");
    }

    onModelsChange(items: Array<NgGridItemEvent>) {
        for (var item of items) {
            item.payload.Config.col = item.col;
            item.payload.Config.row = item.row;
            item.payload.Config.sizex = item.sizex;
            item.payload.Config.sizey = item.sizey;
        }
    }

    onFileDrop(file: File) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function () {
            this.updateModelsLayout(reader.result);
        }.bind(this);
    }

    updateModelsLayout(layout_json : string) {
        var layouts : Array<IViewModelModel> = JSON.parse(layout_json);
        for(var layout of layouts) {
            for(var model of this.models) {
                if (model.Name === layout.Name) {
                    model.Config = layout.Config;
                }
            }
        }
    }

}