var onlineNum = 0;
var bardata = [];
var piedata = [];
var firstStart = 1;

function getData() {
    console.log("getData");
    $.ajax({
        url: "http://localhost:8080/yc/desktoptool/getOnlinePatrolsNum.htm",
        dataType: 'json',
        success: function(data) {
            $('#onlineNum').text(data + ' 人');
        },
        error: function(error) {
            $('#onlineNum').text('无法获取在线人数');
        }
    });
    $.ajax({
        url: "http://localhost:8080/yc/desktoptool/getBarChartData.htm",
        dataType: 'json',
        success: function(data) {
            bardata = [data.ReportNum, data.InstNum, data.DisposeNum, data.ArchiveNum];
        },
        error: function(error) {
            bardata = [0, 0, 0, 0];
        }
    });
    $.ajax({
        url: "http://localhost:8080/yc/desktoptool/getPieChartData.htm",
        dataType: 'json',
        success: function(data) {
            piedata = [];
            $.each(data, function(name, value) {
                if (value > 0) {
                    switch (name) {
                        case "VideoNum":
                            piedata.push({
                                name: "视频上报",
                                value: value
                            });
                            break;
                        case "PatrolNum":
                            piedata.push({
                                name: "巡查上报",
                                value: value
                            });
                            break;
                        case "MessageNum":
                            piedata.push({
                                name: "短信上报",
                                value: value
                            });
                            break;
                        case "CitizenNum":
                            piedata.push({
                                name: "市民通上报",
                                value: value
                            });
                            break;
                        case "PublicNum":
                            piedata.push({
                                name: "社会公众举报",
                                value: value
                            });
                            break;
                        case "PublicFacilityNum":
                            piedata.push({
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
            piedata = [{
                name: "获取数据失败",
                value: 0
            }];
            if (firstStart == 1) {
                ec1();
                firstStart = 0;
            }
        }
    });
};
$(getData());
// $(ec1());
