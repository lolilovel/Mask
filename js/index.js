$(function () {
    echart_2();

    echart_map();




    //echart_2湖南省地图
    function echart_2() {
           // 基于准备好的dom，初始化echarts实例
           var myChart = echarts.init(document.getElementById('chart_2'));
           function showProvince() {
                   myChart.setOption(option = {
                       // backgroundColor: '#ffffff',
                       visualMap: {
                           show: false,
                           min: 0,
                           max: 100,
                           left: 'left',
                           top: 'bottom',
                           text: ['高', '低'], // 文本，默认为数值文本
                           calculable: true,
                           inRange: {
                               color: ['yellow', 'lightskyblue', 'orangered']
                           }
                       },
                       series: [{
                           type: 'map',
                           mapType: 'hunan',
                           roam: true,
                           label: {
                               normal: {
                                   show: true
                               },
                               emphasis: {
                                   textStyle: {
                                       color: '#fff'
                                   }
                               }
                           },
                           itemStyle: {
                               normal: {
                                   borderColor: '#389BB7',
                                   areaColor: '#fff',
                               },
                               emphasis: {
                                   areaColor: '#389BB7',
                                   borderWidth: 0
                               }
                           },
                           animation: false,
                           data: [{
                               name: '长沙市',
                               value:  100
                           }, {
                               name: '株洲市',
                               value: 96
                           }, {
                               name: '湘潭市',
                               value: 98
                           }, {
                               name: '衡阳市',
                               value: 80
                           }, {
                               name: '邵阳市',
                               value: 88
                           }, {
                               name: '岳阳市',
                               value: 79
                           }, {
                               name: '常德市',
                               value: 77,
                           }, {
                               name: '张家界市',
                               value: 33
                           }, {
                               name: '益阳市',
                               value: 69,
                           }, {
                               name: '郴州市',
                               value: 66
                           }, {
                               name: '永州市',
                               value: 22
                           },{
                                name: '娄底市',
                                value: 51
                           },{
                                name: '湘西土家族苗族自治州',
                                value: 44
                           },{
                                name: '怀化市',
                                value: 9
                           }]
                       }]
                   });
           }
   
           var currentIdx = 0;
           showProvince();
           // 使用刚指定的配置项和数据显示图表。
           window.addEventListener("resize", function () {
               myChart.resize();
           });
    }

    // echart_map中国地图
    function echart_map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_map'));

        var mapName = 'china'
        var data = []
        var toolTipData = [];

        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        var geoCoordMap = {
            '福州': [119.4543, 25.9222],
            '长春': [125.8154, 44.2584],
            '重庆': [107.7539, 30.1904],
            '西安': [109.1162, 34.2004],
            '成都': [103.9526, 30.7617],
            '常州': [119.4543, 31.5582],
            '北京': [116.4551, 40.2539],
            '北海': [109.314, 21.6211],
            '海口': [110.3893, 19.8516],
            '长沙': [113.019455,28.200103],
            '上海': [121.40, 31.73],
            '内蒙古': [106.82, 39.67]
        };

        var GZData = [
            [{
                name: '长沙'
            }, {
                name: '福州',
                value: 95
            }],
            [{
                name: '长沙'
            }, {
                name: '长春',
                value: 80
            }],
            [{
                name: '长沙'
            }, {
                name: '重庆',
                value: 70
            }],
            [{
                name: '长沙'
            }, {
                name: '西安',
                value: 60
            }],
            [{
                name: '长沙'
            }, {
                name: '成都',
                value: 50
            }],
            [{
                name: '长沙'
            }, {
                name: '常州',
                value: 40
            }],
            [{
                name: '长沙'
            }, {
                name: '北京',
                value: 30
            }],
            [{
                name: '长沙'
            }, {
                name: '北海',
                value: 20
            }],
            [{
                name: '长沙'
            }, {
                name: '海口',
                value: 10
            }],
            [{
                name: '长沙'
            }, {
                name: '上海',
                value: 80
            }],
            [{
                name: '长沙'
            }, {
                name: '内蒙古',
                value: 80
            }]
        ];

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        var color = ['#c5f80e'];
        var series = [];
        [
            ['石家庄', GZData]
        ].forEach(function (item, i) {
            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: 'arrow',
                    symbolSize: 5
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });

        option = {
            tooltip: {
                trigger: 'item'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(47,79,79, .1)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
            series: series
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }

 
    //点击跳转
    $('#chart_map').click(function(){
        window.location.href = './page/index.html';
    });
    
});
