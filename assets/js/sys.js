var reg = require('regedit');

// console.log(process.cwd());
// console.log(path.dirname(process.execPath));
// console.log(process.execPath)

reg.putValue({
    'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run': {
        'YCDesktop': {
            value: process.execPath,
            type: 'REG_SZ'
        }
    }
}, function() {
    reg.list('HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run')
        .on('data', function(entry) {
            if (entry.data.values['YCDesktop'] == undefined) {
                console.log('设置开机启动失败!');
            } else {
                console.log('已设置开机自动启动,设置路径为: ' + process.execPath);
            }
        });
});
