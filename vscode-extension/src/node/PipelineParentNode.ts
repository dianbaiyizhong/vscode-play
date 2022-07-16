import { TreeItemCollapsibleState, Uri } from 'vscode';
import { BaseSkycMenuItem } from './BaseSkycMenuItem';
import * as path from 'path';
export class PipelineParentNode extends BaseSkycMenuItem {

    public contextValue = 'pipelineParent';

    constructor() {
        let label: string = "我的编排";
        let desc: string = "此处是描述";

        // super(new BaseSkycMenuItem({
        //     label: label,
        //     desc: desc
        // }));
        super();

        this.iconPath = Uri.file(path.join(__filename, '..', '..', 'resources', 'icon_workflow.svg'));
        this.tooltip = `${label}-${desc}`;
        this.description = desc;
        this.collapsibleState = TreeItemCollapsibleState.Collapsed;
        this.label = label;

    }


}