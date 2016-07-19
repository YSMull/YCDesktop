var gui = require('nw.gui');
var win = gui.Window.get();


var scn = gui.Screen.Init();
var s_width = scn.screens[0].bounds.width; //1920
var s_height = scn.screens[0].bounds.height; //1080

//适配分辨率
win.moveTo(s_width - 400/1920 * s_width, 40/1080 * s_height);
win.width = 367/1920 * s_width;
win.height = 510/1080 * s_height;
win.show();

function buildGUI() {
    $("#closebtn").click(function() {
        win.close();
    });
    var tray = new gui.Tray({
        title: 'Tray',
        icon: "assets/img/icon.png",
        tooltip: '桌面插件'
    });
    var isWindoeHide = 0;

    tray.on('click', function() {
        if (isWindoeHide == 0) {
            win.hide();
            isWindoeHide = 1;
        } else {
            win.show();
            isWindoeHide = 0;
        }
    });

    // Give it a menu
    var menu = new gui.Menu();
    menu.append(new gui.MenuItem({
        // type: 'checkbox',
        label: '显示插件',
        click: function() {
            win.show();
            isWindoeHide = 0;
        }
    }));
    menu.append(new gui.MenuItem({
        label: '退出',
        click: function() {
            win.close();
        }
    }));
    tray.menu = menu;

    var options = {
        icon: "assets/img/icon.png",
        body: "插件已启动",
        tag: "hahahah"
    };
    var notification = new Notification("宜春插件", options);
    notification.onclick = function() {
        console.log('notification');
    };
    notification.onshow = function() {
        setTimeout(function() {
            notification.close();
        }, 3000);
    };
}
$(buildGUI());
