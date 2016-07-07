var gui = require('nw.gui');
var win = gui.Window.get();

function buildGUI() {
    $("#closebtn").click(function() {
        win.close();
    });
    var tray = new gui.Tray({
        title: 'Tray',
        icon: "img/icon.png",
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
        icon: "img/icon.png",
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
