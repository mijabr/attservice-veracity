
export interface IPropertyModel
{
    Name : string;
    Type : string;
}

export interface IConfig
{
    col : any;
    row : any;
    sizex : any;
    sizey : any;
};

export interface IViewModelModel
{
    Name : string;
    Properties : IPropertyModel[];
    Config : IConfig;
}

