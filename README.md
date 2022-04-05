# vscode开发配置
## 插件
### remote ssh
让vscode可以远程访问linux机器
> 由于有些linux服务器不能访问外网或者网速比较慢，因此可以选择离线方式配置
1. 【帮助】-》【关于】查看hash_id
2. 下载软件包
https://update.code.visualstudio.com/commit:{hash_id}/server-linux-x64/stable
3. 将下载的东西解压到/root/.vscode-server/bin/目录


### background
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
