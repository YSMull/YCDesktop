var onlineNum = 0;
var barData = [];
var pieData = [];
var firstStart = 1;
var superviseData = [];
var noticeData;

function getData() {
    console.log("getData");
    var fs = require('fs');
    var path = require('path');
    var file = path.join(path.dirname(process.execPath), '/addr.json');
    fs.exists(file, function(exists) {
        if (exists) {
            console.log('找到addr.json文件...');
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) throw err;
                var addr = JSON.parse(data.toString());
                if (addr != '') {
                    console.log('自动设置MIS地址...');
                    $('#YCaddr').val(addr);
                    ycaddr = addr;
                    ajaxProcess();
                }
            })
        } else {
            console.log('没有找到addr.json文件...');
        }
    });
};

function ajaxProcess() {
    console.log('正在远程获取数据...');
    $.ajax({
        url: ycaddr + "/desktoptool/getOnlinePatrolsNum.htm",
        dataType: 'json',
        success: function(data) {
            $('#onlineNum').text(data + ' 人');
        },
        error: function(error) {
            console.log('获取在线人数失败！');
            $('#onlineNum').text('无法获取在线人数');
        }
    });
    $.ajax({
        url: ycaddr + "/desktoptool/getBarChartData.htm",
        dataType: 'json',
        success: function(data) {
            barData = [data.ReportNum, data.InstNum, data.DisposeNum, data.ArchiveNum];
        },
        error: function(error) {
            console.log('获取柱状图数据失败！');
            barData = [0, 0, 0, 0];
        }
    });
    $.ajax({
        url: ycaddr + "/desktoptool/getPieChartData.htm",
        dataType: 'json',
        success: function(data) {
            pieData = [];
            $.each(data, function(name, value) {
                if (value > 0) {
                    switch (name) {
                        case "VideoNum":
                            pieData.push({
                                name: "视频上报",
                                value: value
                            });
                            break;
                        case "PatrolNum":
                            pieData.push({
                                name: "巡查上报",
                                value: value
                            });
                            break;
                        case "MessageNum":
                            pieData.push({
                                name: "短信上报",
                                value: value
                            });
                            break;
                        case "CitizenNum":
                            pieData.push({
                                name: "市民通上报",
                                value: value
                            });
                            break;
                        case "PublicNum":
                            pieData.push({
                                name: "社会公众举报",
                                value: value
                            });
                            break;
                        case "PublicFacilityNum":
                            pieData.push({
                                name: "公用设备检测上报",
                                value: value
                            });
                            break;
                    }
                }
            });
            if (firstStart == 1) {
                ec1();
                firstStart = 0;
            }
        },
        error: function(error) {
            console.log('获取饼图数据失败！')
            pieData = [{
                name: "无数据",
                value: 0
            }];
            if (firstStart == 1) {
                ec1();
                firstStart = 0;
            }
        }
    });
    $.ajax({
            url: ycaddr + '/desktoptool/getSupervise.htm',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(data) {
            superviseData = data;
            renderSuperviseTable();
        })
        .fail(function() {
            console.log('获取预警信息失败！');
        });
    $.ajax({
            url: ycaddr + '/desktoptool/getNotice.htm',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(data) {
            noticeData = data;
            refreshNoticePanel();
        })
        .fail(function() {
            console.log("获取公告信息失败！");
        });
}
$(getData());
