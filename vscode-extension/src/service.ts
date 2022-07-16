import { ModelNode } from './node/ModelNode';
import { PipelineParentNode } from './node/PipelineParentNode';
import { ModelParentNode } from './node/ModelParentNode';
import { BaseSkycMenuItem } from './node/BaseSkycMenuItem';
import axios from 'axios';
export class ApiService {

    async getModelList(): Promise<Array<BaseSkycMenuItem>> {
        const items: Array<BaseSkycMenuItem> = [];


        const response = await axios.get("http://localhost:3000/json/modelList.json", {
            headers: { 'contentType': 'application/json' },
        });

        for (let i = 0; i < response.data.length; i++) {
            items.push(new ModelNode(response.data[i]));
        }
        return items;
    }


    async getParentNode(): Promise<Array<BaseSkycMenuItem>> {
        const items: Array<BaseSkycMenuItem> = [];

        items.push(new ModelParentNode());
        items.push(new PipelineParentNode());

        return items;
    }
}
