---
level: 2
name: mitmproxy
---

一个命令行的 HTTP 调试监控工具

一般 Mac 下常用的同类工具是 Charles, 不过 Charles 是收费软件, 而且命令行的应用启动更快, 也能在 linux 上使用.

基本用法 `mitmproxy -p 8080` , 这样就是你本机的8080端口建立了一个代理.

接着在手机上, 配置网络代理, ip 是你开发机的 ip, 端口就是上面配置的 8080

查看帮助可以在 mitmproxy 界面中输入 `?`, 一般我们只是查一下 HTTP 的 request 和 response, 最基本的功能就够用了.
