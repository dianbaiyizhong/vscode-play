import Mock from 'mockjs';

// 设置响应延时
Mock.setup({
    timeout: '100-1000'//可以是整数，也可以是‘-’字符串
});


Mock.mock('/mock/model/list', 'get', {
    'msg': '操作成功',
    'code': 0,
    'data': [
        {
            name: "父节点",
            id: 0,
            isParent: true,
        },
        {
            name: "父节点2",
            id: 100,
            isParent: true,
        },
    ]
});
