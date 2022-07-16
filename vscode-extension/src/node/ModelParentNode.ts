import { TreeItemCollapsibleState, Uri } from 'vscode';
import { BaseSkycMenuItem } from './BaseSkycMenuItem';
import * as path from 'path';
export class ModelParentNode extends BaseSkycMenuItem {


    public contextValue = 'modelParent';

    constructor() {
        let label: string = "我的模型";
        let desc: string = "此处是描述";

        super();

        this.iconPath = Uri.file(path.join(__filename, '..', '..', 'resources', 'icon_model.svg'));
        this.tooltip = `${label}-${desc}`;
        this.description = desc;
        this.collapsibleState = TreeItemCollapsibleState.Collapsed;
        this.label = label;

    }

}