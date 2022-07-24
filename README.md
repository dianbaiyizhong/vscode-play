# 玩转vscode
## 插件篇
###### remote ssh
让vscode可以远程访问linux机器
> 由于有些linux服务器不能访问外网或者网速比较慢，因此可以选择离线方式配置
1. 【帮助】-》【关于】查看hash_id
2. 下载软件包
https://update.code.visualstudio.com/commit:{hash_id}/server-linux-x64/stable
3.在/root/.vscode-server/bin/下新建一个文件夹，名字叫{hash_id}
3. 将下载的东西解压到/root/.vscode-server/bin/{hash_id}目录下即可



> 免密码
```sh
ssh-keygen
```
c盘用户目录下的： .ssh\id_rsa.pub
复制内容到远程linux的
/root/.ssh/authorized_keys下，如果没有authorized_keys文件，那就创建一个即可





###### MySQL
> 请注意作者名字是Weijan Chen







###### background
```json
{
    "glassit.alpha":220,
    "background.customImages":
    [
        "file:///C:/Users/1/Pictures/pngaaa.com-271098.png",
        "file:///C:/Users/1/Pictures/asuna.png",
        "file:///C:/Users/1/Pictures/031.png",
        "file:///C:/Users/1/Pictures/55394572-30827700-5572-11e9-9435-2cc501eb53bb.png"
    ],
    "background.useDefault":false,
    "background.enabled":true,
    "background.style":{
        "content":"''",
        "pointer-events":"none",
        "position":"absolute",
        "z-index":"99999",
        "width":"100%",
        "height":"100%",
        "background-position":"bottom right",
        "background-size":"auto 50%",
        "background-repeat":"no-repeat",
        "opacity":0.6
    },
    "background.styles":[

        {
            "content":"''",
            "pointer-events":"none",
            "position":"absolute",
            "z-index":"99999",
            "width":"100%",
            "height":"100%",
            "background-position":"bottom right",
            "background-size":"auto 100%",
            "background-repeat":"no-repeat",
            "opacity":0.5
        },
        {
            "content":"''",
            "pointer-events":"none",
            "position":"absolute",
            "z-index":"99999",
            "width":"100%",
            "height":"100%",
            "background-position":"bottom right",
            "background-size":"auto 50%",
            "background-repeat":"no-repeat",
            "opacity":0.7
        },
        {
            "content": "''",
            "pointer-events": "none",
            "position": "absolute",
            "right": "0",
            "bottom": "0",
            "width":"45%",
            "height":"45%",
            "z-index":"9999",
            "background-size": "contain",
            "opacity": 0.3
           },
     
    ],
    "background.loop": false,
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "java.configuration.maven.userSettings": "D:\\software\\apache-maven-3.5.2\\conf\\settings.xml",
    "maven.executable.path": "D:\\software\\apache-maven-3.5.2\\bin\\mvn",
    "redhat.telemetry.enabled": true,
    "files.exclude": {
        "**/.classpath": true,
        "**/.project": true,
        "**/.settings": true,
        "**/.factorypath": true
    },
    "java.configuration.maven.globalSettings": "D:\\software\\apache-maven-3.5.2\\conf\\settings.xml",
    "workbench.startupEditor": "newUntitledFile",
    "vetur.format.defaultFormatterOptions": {

        "js-beautify-html": {
            "wrap_attributes": "auto"
        },
        "prettyhtml": {
            "printWidth": 100,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": false
        }
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "workbench.editorAssociations": {
        "*.png": "cweijan.officeViewer",
        "*.md": "cweijan.markdownViewer"
    },
    "remote.SSH.remotePlatform": {
        "192.168.68.220": "linux",
        "150.158.186.188": "linux",
        "192.168.68.51": "linux",
        "192.168.68.52": "linux",
        "192.168.68.53": "linux"
    },
    "sshfs.configs": [
        {
            "name": "150.158.186.188",
            "host": "150.158.186.188",
            "username": "root",
            "password": "Mm5590026"
        },
        {
            "name": "p7i",
            "host": "150.158.186.188",
            "username": "root"
        }
    ],
    "powermode.enabled": true,
    "workbench.editor.enablePreview": false,
    "security.workspace.trust.untrustedFiles": "open",
    "git.ignoreLegacyWarning": true
}
```


## vscode插件开发笔记
###### 安装脚手架工具
```sh
npm install -g yo generator-code
```
###### 创建工程
```sh
yo code
```


###### extension.ts文件代码

```js
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('myWebview', () => {
            // 创建并显示一个新的webview
            const panel = vscode.window.createWebviewPanel(
                'Test', // 标识webview的类型
                'webview', // 展示给用户的面板的标题
                vscode.ViewColumn.One, // 显示webview面板以编辑器新列的方式.
                {
                    enableScripts: true
                } // webview其他的选项
            );
            //加载本地html页面
            let srcPath = path.join(context.extensionPath, 'dist');
            const srcPathUri = vscode.Uri.file(srcPath);
            const baseUri = panel.webview.asWebviewUri(srcPathUri);
            const indexPath = path.join(srcPath, 'index.html');
            var indexHtml = fs.readFileSync(indexPath, "utf8");
            indexHtml = indexHtml.replace(/((src|href)=("|'))(.+?\.(css|js))\b/gi, "$1" + 
            baseUri.toString() + "/$4");

            console.log(indexHtml)
            panel.webview.html = indexHtml;

        })
    );

}

// this method is called when your extension is deactivated
export function deactivate() { }

```

###### package.json
```json
	"activationEvents": [
		"onCommand:myWebview"
	],
	"main": "./dist/extension.js",
	"contributes": {
		"commands": [
			{
				"command": "myWebview",
				"title": "webview",
				"category": "webview"
			}
		]
	}
```

> 具体可以查看工程vscode-extension

###### 调试方式
1. 按F5即可打开调试页面
2. 待补充
