/**
 * Created by apple on 16/6/3.
 */
const electron = require('electron')
const fs = require('fs')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const ipcMain = electron.ipcMain
// 创建窗口模块


//为Window对象创建一个全局的引用,否则可能被JavaScript的垃圾回收机制自动回收
var win = null;


/**
 * @function 创建窗口
 */
function createWindow() {

  win = new BrowserWindow({
    width: 600,
    height: 600,
    autoHideMenuBar: true
  });
  win.loadURL(`file://` + __dirname + `/index.html`);
  win.on('closed', () => {
    win = null;
  });
  //  win.webContents.openDevTools();

}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
ipcMain.on('synchronous-message', function(event, arg) {
  console.log(arg); // prints "ping"
  var json = JSON.parse(arg.toString())
  var res;
  var msg = [];
  if (json.cmd == "list")
    res = list(json, msg)
  else if (json.cmd == "delete") {
    res = del(json, msg)
  }
  send(event, res, json.cmd, msg)
  console.log(msg)
});

function send(event, res, cmd, msg) {

  var tip = '""'
  if (msg.length > 0) {
    tip = "["
    for (var i = 0; i < msg.length; i++)
      tip = tip + '{"info":"' + msg[i].replace(/[^0-9a-z\s:]/gi, "") + '"},'
    tip = tip.substring(0, tip.length - 1) + "]"
  }
  console.log(res)
  var o = '{"reply":"' + cmd + '","value":' + res + ',"error":' + tip + '}'
  console.log(o)
  event.sender.send('synchronous-reply', o);
}

function del(json, msg) {
  var r = true
  try {
    fs.unlinkSync(json.value)
  } catch (e) {
    msg.push(e.message)
    r = false
  }
  return r
}

function list(json, msg) {
  var res = fs.readdirSync(json.value)
  var str = '['
  var flag = false;
  for (var i = 0; i < res.length; i++) {
    if (!flag)
      flag = !flag
    var state = false
    try {
      if (fs.statSync(json.value + '/' + res[i]).isDirectory())
        state = true
      str = str + '{"is":' + state + ',"file":"' + res[i] + '"},'
    } catch (e) {
      msg.push(e.message)
    }
  }
  if (flag)
    str = str.substring(0, str.length - 1) + ']'
  else
    str = '[]'
  return str
}
