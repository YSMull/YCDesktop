var events = require('events');
var ycaddr;
var channel = new events.EventEmitter(); //设置监听器, nodejs 独有
var tick = 0;
var switchTick = 10; //间隔时间（秒）
channel.on('holdCharts', function() { //如果点击了按钮，记时清零
	tick = 0;
});
setInterval(function() { //每隔五秒获取数据一次
	getData();
}, 5000);
setInterval(function() { //计时器：每间隔 switchTick 秒切换图表
	tick++;
	if (tick == switchTick) { //达到间隔时间重新计时
		tick = 0;
		switchCharts(); // $('#switchbtn').trigger('click');
	}
}, 1000)


$('#setbtn').click(function() {
	var showSet = 0;
	var hide;//TODO: 当功能模块较多时,setting窗口的进入与恢复的逻辑会变复杂,以后考虑弹窗形式
	return function() {
		if(showSet == 0){//保存进入设置界面之前需要被隐藏的div
			if($('#content').css('display') == 'block') {
				hide = '#content';
			} else {
				hide = '#supervise'
			}
		}
		if (showSet == 0) {
			$('#bottom,#notice,'+hide).fadeOut('300', function() {
				$('#setting').fadeIn('300');
			});
			showSet = 1;
		} else {
			$('#setting').fadeOut('300', function() {
				$('#bottom,#notice,'+hide).fadeIn('300');
				if(hide == '#content') {
					ec1();
					channel.emit('holdCharts');
				}
			});
			showSet = 0;
		}
	}
}());

$('#refreshbtn').click(function() {
	var $rbtn = $('#refreshbtn');
	var $rbtnspan = $rbtn.find('span');
	//开始转圈
	$rbtnspan.addClass('glyphicon-refresh-animate')
	.removeClass('glyphicon-ok')
	.removeClass('glyphicon-remove')
	.addClass('glyphicon-refresh');
	$rbtn.removeClass('btn-default').removeClass('btn-success')
	.removeClass('btn-danger').addClass('btn-warning');
	//2s 后发送测试请求
	setTimeout(function() {
		$.ajax({
			url: $('#YCaddr').val().replace(/(\/*$)/g,'') + '/desktoptool/connectTest.htm',
			dataType: 'json',
			success: function(data) {
				var fs = require('fs');
				var path = require('path');
				var file = path.join(path.dirname(process.execPath), '/addr.json');

				fs.writeFile(file, JSON.stringify($('#YCaddr').val().replace(/(\/*$)/g,'')), 'utf8', function(err){
					if(err) throw err;
					console.log('成功保存地址到addr.json文件');
				});

				if (data.success == true) {
					ycaddr = $('#YCaddr').val().replace(/(\/*$)/g,'');
					$rbtnspan.removeClass('glyphicon-refresh-animate');
					$rbtn.removeClass('btn-warning').addClass('btn-success');
					$rbtnspan.removeClass('glyphicon-refresh').addClass('glyphicon-ok');
					// $rbtn.addClass('disabled');
				}
			},
			error: function(error) {
				console.log(error);
				$rbtnspan.removeClass('glyphicon-refresh-animate');
				$rbtn.removeClass('btn-warning').addClass('btn-danger');
				$rbtnspan.removeClass('glyphicon-refresh').addClass('glyphicon-remove');
				// $rbtn.addClass('disabled');
			}
		});
	}, 2000);
});

$('#switchbtn').click(function() {
	channel.emit('holdCharts'); //发送点击事件，计时器重新计时
	switchCharts();
});

$('#superviseManager').click(function() {
	$('#peopleManager').prop('disabled', true);
	$('#content').fadeOut('300', function() {
		$('#supervise').fadeIn('300', function() {
			$('#peopleManager').prop('disabled', false);
		});
	});

	$('#peopleManager').removeClass('btn-success').addClass('btn-default');
	$('#superviseManager').removeClass('btn-default').addClass('btn-success');
});

$('#peopleManager').click(function() {
	$('#superviseManager').prop('disabled', true);
	$('#supervise').fadeOut('300', function() {
		$('#content').fadeIn('300', function() {
			$('#superviseManager').prop('disabled', false);
		});
		ec1();
		channel.emit('holdCharts');
	});

	$('#superviseManager').removeClass('btn-success').addClass('btn-default');
	$('#peopleManager').removeClass('btn-default').addClass('btn-success');
});
