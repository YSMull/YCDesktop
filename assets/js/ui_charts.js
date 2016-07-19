function ec1() {
    console.log('render pieChart');
    var myChart = echarts.init(document.getElementById('charts'));
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        // legend: {
        //     orient: 'horizontal',
        //     left: 'center',
        //     data: ['视频上报','12319热线','市民上报','巡查上报']
        // },
        series: [{
            label: {
                normal: {
                    position: 'out'
                }
            },
            name: '访问来源',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: pieData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    myChart.on('mouseover', function() {
        channel.emit('holdCharts');
    });
    // myChart.on('legendselectchanged', function(){
    //  channel.emit('holdCharts');
    // });
    myChart.setOption(option);
}

function ec2() {
    console.log('render barChart');
    var myChart = echarts.init(document.getElementById('charts'));
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['上报', '立案', '处置', '结案']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: 25,
            data: barData
        }]
    };
    myChart.on('mouseover', function() {
        channel.emit('holdCharts');
    });
    myChart.setOption(option);
}
var switchCharts = function() { //闭包，能判断切换到哪一个图表
    var ch = 1;
    return function() {
        console.log('switchCharts');
        if (ch == 0) {
            ec1();
            ch = 1;
        } else {
            ec2();
            ch = 0;
        }
    }
}();

function renderSuperviseTable() {
    console.log('renderSuperviseTable');
    $table = $('#superviseTable tbody');
    $table.empty();
    for (var i = 0; i < superviseData.length; i++) {
        var ntr = document.createElement('tr');
        var reportTime = '<td>' + new Date(superviseData[i].reportTime).toISOString().slice(5, 10) + '-' + new Date(superviseData[i].reportTime).toISOString().slice(11, 19) + '</td>';
        var equipName = '<td>' + superviseData[i].equipName + '</td>';
        var fieldName = '<td>' + superviseData[i].fieldName + '</td>'
        var equipFieldValue = '<td>' + superviseData[i].equipFieldValue + '</td>';
        ntr.innerHTML = reportTime+equipName+fieldName+equipFieldValue;

        $table.append(ntr);
    }
}

function refreshNotice() {
    console.log('refreshNotice');
    $('#noticeModal').text(noticeData.content);
    var limits = 70;
    if(noticeData.content.length >= limits) {
        $('#noticePanel').text(noticeData.content.substring(0, limits) + "...");
        $('#noticePanel').append("<a class=\"nodrag\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"cursor: pointer;\">查看更多</a>");

    } else {
        $('#noticePanel').text(noticeData.content);
    }



}
