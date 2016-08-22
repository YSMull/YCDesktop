var gui = require('nw.gui');

// var nwWin = gui.Window;
// var win = gui.Window.get();
// var new_win = gui.Window.open('index.html');
// Get the current window


// Create a new window and get it
gui.Window.open('www.baidu.com', {
    "frame": false,
    // "show_in_taskbar": true, // x
    "title": "插件",
    "show_in_taskbar": false,
    // "position": "center",
    // "fullscreen ": false,
    // "always-on-top": true, // x
    "transparent": true,
    // "show": false,
    "width": 367,
    "height": 510
}, function(new_win) {
    console.log(new_win)
    // var scn = gui.Screen.Init();
    // var s_width = scn.screens[0].bounds.width; //1920
    // var s_height = scn.screens[0].bounds.height; //1080
    // new_win.moveTo(window.screen.availWidth - 400, 40);


});
// var scn = gui.Screen.Init();
// var s_width = scn.screens[0].bounds.width; //1920
// var s_height = scn.screens[0].bounds.height; //1080


// win.moveTo(window.screen.availWidth - 400, 40);
// win.show();

$.ajax({
    url: '/path/to/file',
    type: 'default GET (Other values: POST)',
    dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: {param1: 'value1'},
})
.done(function() {
    console.log("success");
})
.fail(function() {
    console.log("error");
})
.always(function() {
    console.log("complete");
});
