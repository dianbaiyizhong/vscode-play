
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { ApiService } from './service';
import { SkycTreeDataProvider } from './skycTreeDataProvider';
export function activate(context: vscode.ExtensionContext) {


    console.info("skyc activate...");
    // 设置全局变量
    vscode.commands.executeCommand('setContext', 'skyc.isLogin', true);


    const service = new ApiService();

    vscode.window.registerTreeDataProvider('skycMenuView', new SkycTreeDataProvider(service));


    vscode.commands.registerCommand('skyc.login', (id) => {

        vscode.window.showInputBox(
            {
                password: false, // 输入内容是否是密码
                ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
                placeHolder: '你到底想输入什么？', // 在输入框内的提示信息
                prompt: '赶紧输入，不输入就赶紧滚', // 在输入框下方的提示信息
                validateInput: function (text) { return true; } // 对输入内容进行验证并返回
            }).then(function (msg) {
                console.log("用户输入：" + msg);
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    cancellable: false,
                    title: '正在加载中...'
                }, (progress) => {
                    // progress.report({ increment: 0 });
                    return new Promise<void>(resolve => {
                        setTimeout(() => {
                            resolve();
                        }, 3000);
                    });
                });
                // vscode.window.registerTreeDataProvider('skycMenuView', new SkycTreeDataProvider(service));

            });

    });

    vscode.commands.registerCommand('skyc.debugSql', (id) => {
        vscode.commands.executeCommand('workbench.action.editorLayoutTwoRows');
        const panel = vscode.window.createWebviewPanel(
            'Test', // 标识webview的类型
            '标签页test', // 展示给用户的面板的标题
            vscode.ViewColumn.Two, // 显示webview面板以编辑器新列的方式.
            {
                enableScripts: true
            }
        );
        let srcPath = path.join(context.extensionPath, 'dist');
        const srcPathUri = vscode.Uri.file(srcPath);
        const baseUri = panel.webview.asWebviewUri(srcPathUri);
        const indexPath = path.join(srcPath, 'index.html');
        var indexHtml = fs.readFileSync(indexPath, "utf8");
        indexHtml = indexHtml.replace(/((src|href)=("|'))(.+?\.(css|js))\b/gi, "$1" + baseUri.toString() + "/$4");

        panel.webview.html = indexHtml;


    });


    context.subscriptions.push(
        vscode.commands.registerCommand('model.click', (id) => {

            const wsedit = new vscode.WorkspaceEdit();
            const filePath = vscode.Uri.file(os.homedir() + path.sep + 'skycWorkSpace' + path.sep + 'world.sql');
            wsedit.createFile(filePath, { ignoreIfExists: true });
            vscode.workspace.applyEdit(wsedit);
            openLocalFile(filePath.path);
            // openStrInWindow("select * from user", "sql");
        })

    );



}

function openLocalFile(filePath: string) {
    // 获取TextDocument对象
    vscode.workspace.openTextDocument(filePath)
        .then(doc => {
            // 在VSCode编辑窗口展示读取到的文本
            vscode.window.showTextDocument(doc);
        }, err => {
            console.log(`Open ${filePath} error, ${err}.`);
        }).then(undefined, err => {
            console.log(`Open ${filePath} error, ${err}.`);
        });
}
function openStrInWindow(fileContent: string, fileLanguage: string = 'xml') {
    var option = {
        language: fileLanguage,
        content: fileContent
    };
    vscode.workspace.openTextDocument(option)
        .then(doc => {
            vscode.window.showTextDocument(doc);
        }, err => {
            console.error('Open string in window err,' + err);
        }).then(undefined, err => {
            // 捕获异常，相当于try-catch
            console.error('Open string in window err,' + err);
        });
}

function commandWrapper(commandDefinition: any, command: string): (...args: any[]) => any {
    return (...args: any[]) => {
        try {
            commandDefinition[command](...args);
        } catch (err) {
            console.log(err);
        }
    };
}
function initCommand(commandDefinition: any): vscode.Disposable[] {
    const dispose = []
    for (const command in commandDefinition) {
        if (commandDefinition.hasOwnProperty(command)) {
            dispose.push(vscode.commands.registerCommand(command, commandWrapper(commandDefinition, command)))
        }
    }
    return dispose;
}
export function deactivate() { }
