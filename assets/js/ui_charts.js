function ec1() {
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
            data: piedata,
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
            data: bardata
        }]
    };
    myChart.on('mouseover', function() {
        channel.emit('holdCharts');
    });
    myChart.setOption(option);
}
var switchCharts = function () {//闭包，能判断切换到哪一个图表
        var ch = 1;
        return function() {
            if(ch == 0) {
                ec1();
                ch = 1;
            } else {
                ec2();
                ch = 0;
            }
        }
    }();

