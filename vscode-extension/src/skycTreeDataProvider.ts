import { ModelParentNode } from './node/ModelParentNode';
import { ApiService } from './service';
import { TreeDataProvider, EventEmitter, Event } from 'vscode';
import { BaseSkycMenuItem } from './node/BaseSkycMenuItem';


export class SkycTreeDataProvider implements TreeDataProvider<BaseSkycMenuItem>{
    private _onDidChangeTreeData: EventEmitter<any> = new EventEmitter<any>();

    readonly onDidChangeTreeData: Event<any> = this._onDidChangeTreeData.event;
    private service: ApiService;

    constructor(service: ApiService) {
        this.service = service;
    }


    getTreeItem(element: BaseSkycMenuItem) {
        return element;
    }

    getChildren(element: BaseSkycMenuItem) {
        if (!element) {
            return Promise.resolve(this.service.getParentNode());
        } else {

            if (element instanceof ModelParentNode) {
                return Promise.resolve(this.service.getModelList());
            } else {
                return Promise.resolve([]);
            }
        }
    }



}