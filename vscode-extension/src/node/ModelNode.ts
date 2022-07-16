import { TreeItemCollapsibleState, Uri } from 'vscode';
import { BaseSkycMenuItem } from './BaseSkycMenuItem';
import * as path from 'path';


export interface ModelNode {
    id: string;
    label: string;
    desc: string;
}

export class ModelNode extends BaseSkycMenuItem {

    public contextValue = 'model';

    constructor(item: ModelNode) {

        super();

        this.iconPath = Uri.file(path.join(__filename, '..', '..', 'resources', 'icon_model.svg'));
        this.tooltip = `${item.label}-${item.desc}`;
        this.description = item.desc;
        this.collapsibleState = TreeItemCollapsibleState.None;
        this.label = item.label;
        this.command = {
            title: '菜单模型点击',
            command: 'model.click',
            arguments: [
                item.id,
            ],
        };
    }

}