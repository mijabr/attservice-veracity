import { Component, Input } from '@angular/core';
import { IViewModelModel } from './../model/viewmodel.model';
import { MdIconRegistry } from '@angular/material'
import { AttacheApiService } from './../service/attacheapi.service';
var publicPath = require('./../../../config/publicPath');

@Component({
  selector: 'viewmodel',
  template: require('./viewmodel.component.html'),
  styles: [require('./viewmodel.component.css')]
})
export class ViewModelComponent {

  constructor(private iconRegistry: MdIconRegistry,
              private api: AttacheApiService) {
//    iconRegistry.addSvgIcon('properties', 'assets/svg/ic_receipt_black_24px.svg');
    iconRegistry.addSvgIcon('properties', publicPath.make('assets/svg/ic_receipt_black_24px.svg'));
    
  }

  @Input() model : IViewModelModel;
  displayProperties : boolean = false;

  toggleProperties() {
    this.displayProperties = !this.displayProperties;
  }
}

