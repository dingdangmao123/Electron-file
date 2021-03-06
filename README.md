# Electron-file

- 采用Electron Node.js 开发桌面程序
- 采用jQuery和Bootstrap构建页面
- 提供文件目录查看，删除功能
- 可以进一步根据文件类型提供不同的图标，便于显示

## 效果图

![](https://github.com/dingdangmao123/Electron-file/blob/master/demo/1.png)

![](https://github.com/dingdangmao123/Electron-file/blob/master/demo/2.png)

![](https://github.com/dingdangmao123/Electron-file/blob/master/demo/3.png)

### 总结

- 功能比较简单，利用web方式构建页面较为方便快速
- node.js 写起来有较大不适，动态类型和各种回调不方便调试，维护不方便，缺乏一个强大的IDE提供智能提示
- 总之用来编写简单的桌面小工具还是比较快捷方便的，工程量不大
- 作为一个练手小项目，体现出了jQuery的局限性，每一次操作如Ajax请求等，都可能伴随着大量组件的更新，要编写大量的代码去实现数据同步，当逻辑，页面复杂时代码更时难以维护，可考虑采用Vue.js等框架
