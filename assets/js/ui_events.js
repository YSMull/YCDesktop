var events = require('events');
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

$('#refreshbtn').click(function() {
	var $rbtn = $('#refreshbtn');
	var $rbtnspan = $rbtn.find('span');
	//开始转圈
	$rbtnspan.addClass('glyphicon-refresh-animate');
	$rbtn.removeClass('btn-default').addClass('btn-warning');
	//2s 后发送测试请求
	setTimeout(function() {
		$.ajax({
			url: "http://localhost:8080/yc/desktoptool/connectTest.htm",
			dataType: 'json',
			success: function(data) {
				if (data.success == true) {
					$rbtnspan.removeClass('glyphicon-refresh-animate');
					$rbtn.removeClass('btn-warning').addClass('btn-success');
					$rbtnspan.removeClass('glyphicon-refresh').addClass('glyphicon-ok');
					$rbtn.addClass('disabled');
				}
			},
			error: function(error) {
				console.log(error);
				$rbtnspan.removeClass('glyphicon-refresh-animate');
				$rbtn.removeClass('btn-warning').addClass('btn-danger');
				$rbtnspan.removeClass('glyphicon-refresh').addClass('glyphicon-remove');
				$rbtn.addClass('disabled');
			}
		});
	}, 2000);
});

$('#setbtn').click(function() {
	var showSet = 0;
	return function() {
		if (showSet == 0) {
			// $('#content').css('display', 'none');
			// $('#setting').css('display', 'block');
			$('#content').fadeOut('300', function() {
				$('#setting').fadeIn('300');
			});
			showSet = 1;
		} else {
			// $('#content').css('display', 'block');
			// ec1();channel.emit('holdCharts');
			// $('#setting').css('display', 'none');
			$('#setting').fadeOut('300', function() {
				$('#content').fadeIn('300');
				ec1();
				channel.emit('holdCharts');
			});
			showSet = 0;
		}
	}
}());

$('#switchbtn').click(function() {
	channel.emit('holdCharts'); //发送点击事件，计时器重新计时
	switchCharts();
});
