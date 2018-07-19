$(function () {
    LoadmapChart();
    LoadMapChart2();
});

var LoadmapChart = function ()
{
    var chart = echarts.init(document.getElementById('ChartMap'));
   
    var title = '流向地图模板'
    var ZOOM = 12 //地图默认放大
    var isEffect = true //是否要飞机动效
    var lineWidth = 2  //线条宽度
    var pointSymbolSize = 15 //中心店黑色小球大小
    //中心点
    var point = [{
        "name": "中心点",
        "value": ["116.347274", "39.853929", 507]
    }]
    //红色线条
    var targetInPoint = [{
        "name": "某地址四",
        "value": ["116.3645884604655", "39.9266", "248"]
    }, {
        "name": "某地址五",
        "value": ["116.27913894184664", "39.9372266", "163"]
    }, {
        "name": "某地址六",
        "value": ["116.46935206137962", "39.97451362496428", "96"]
    }]

    //蓝色线条
    var targetOutPoint = [{
        "name": "某地址一\n\n",
        "value": ["116.3944375", "39.90018", "44"]
    }, {
        "name": "\n\t某地址二\n\t很长",
        "value": ["116.5273732", "39.92266423", "43"]
    }, {
        "name": "某地址三",
        "value": ["116.2543042", "39.90391277", "37"]
    }]

    //飞机路径
    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    // --------------可动态获取的外置参数/end------------------------——
    var inPoint = []
    var outPoint = []
    targetInPoint.forEach((item, index) => {
        targetInPoint[index]['tag'] = 'in'
        inPoint.push({
            name: point[0].name,
            toname: item.name,
            coords: [point[0].value.slice(0, 2), item.value.slice(0, 2)],
        })
    })
    targetOutPoint.forEach((item, index) => {
        targetOutPoint[index]['tag'] = 'out'
        outPoint.push({
            name: point[0].name,
            toname: item.name,
            coords: [point[0].value.slice(0, 2), item.value.slice(0, 2)],
        })
    })
    var targetPoint = [...targetInPoint, ...targetOutPoint]
    function getSeries() {
        var arr = [{
            type: 'lines',
            mapType: 'china',
            coordinateSystem: 'bmap',
            zlevel: 10,
            data: outPoint,
            //线上面的动态特效
            effect: {
                show: isEffect,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    width: lineWidth,
                    color: '#5170A2',
                    curveness: 0.2,
                }
            }
        }, {
            type: 'lines',
            mapType: 'china',
            coordinateSystem: 'bmap',
            zlevel: 10,
            data: inPoint,
            effect: {
                show: isEffect,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    width: lineWidth,
                    color: '#D07070',
                    curveness: 0.3,
                }
            }
        }, {
            type: 'effectScatter',
            mapType: 'china',
            coordinateSystem: 'bmap',
            zlevel: 10,
            // symbolSize: 6,
            symbolSize: function (value) {
                var v = value && value[2]  //可自动以更改
                var size = parseInt(v) / 4
                if (size >= 20) return 20
                if (size <= 2) return 2
                return size
                // return 20
            },
            label: {
                normal: {
                    show: true,
                    fontWeight: 300,
                    position: 'right',
                    formatter: ' {b}',
                    textStyle: {
                        fontFamily: '宋体', //字体样式可改
                    },
                    // color:function(value){
                    //   console.log(value)
                    // }
                    // color:'yellow'
                }
            },
            rippleEffect: {
                period: 8,
                scale: 2,
                brushType: 'stroke',
            },
            showEffectOn: 'render',
            itemStyle: {
                normal: {
                    textStyle: {
                        fontWeight: 700,
                        fontStyle: 'italic',
                        fontSize: '17',
                        fontFamily: 'cursive',
                    },
                    color: function (value) {
                        switch (value.data.tag) {
                            case 'in':  //可调整颜色
                                return '#D07070'
                                break;
                            case 'out': //可调整颜色
                                return '#5170A2'
                                break;
                            default:

                        }
                    },
                }
            },
            data: targetPoint,
            // data: convertData(houseData),
        },
            {
                type: 'effectScatter',
                mapType: 'china',
                coordinateSystem: 'bmap',
                zlevel: 10,
                symbolSize: pointSymbolSize,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        textStyle: {
                            fontWeight: 600,
                            fontSize: '16',
                            fontFamily: '宋体',
                        },
                    }
                },
                showEffectOn: 'render',
                rippleEffect: {
                    period: 8,
                    scale: 2,
                    brushType: 'stroke',
                },

                itemStyle: {
                    normal: {
                        color: '#414957',
                    },
                    //shadowBlur: 10,
                },
                // data: convertData(schoolData),
                data: point,
            },
        ]
        return arr
    }
    var option2 = {
        title: {
            text: title
        },
        bmap: {
            center: point[0].value.slice(0, 2),
            zoom: 12,
            roam: true,
            //地图样式的调整
            mapStyle: {
                styleJson: [{
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": {
                        "lightness": 47,
                        "saturation": -100
                    }
                },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    }, {
                        "featureType": "label",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "on"
                        }
                    }
                ]
            }
        },
        // legend: {
        //     orient: 'horizontal',
        //     top: 10,
        //     icon: 'circle',
        //     itemWidth: 6,
        //     itemHeight: 6,
        //     itemGap: 6,
        //     borderRadius: 6,
        //     data: ['网外', '网内']
        // },
        series: getSeries()
    }

    chart.setOption(option2);
}

var LoadMapChart2 = function ()
{
    var PointDataBDZ = new Array();
    var PointDataKGZ = new Array();
    var PointDataNYZ = new Array();
    var PointDataDK = new Array();

    var result = '[{"F_ID":"1","F_Name":"青虹站","F_ParamValue":"变电站","F_Long":"121.315542000000","F_Lat":"31.206026000000"},' +
        '{"F_ID":"2","F_Name":"杨虹站","F_ParamValue":"开关站","F_Long":"121.314212000000","F_Lat":"31.203431000000"},' +
        '{"F_ID":"3","F_Name":"能源站南站","F_ParamValue":"能源站","F_Long":"121.317994000000","F_Lat":"31.194921000000"},' +
        '{"F_ID":"4","F_Name":"能源站北站","F_ParamValue":"能源站","F_Long":"121.312788000000","F_Lat":"31.203037000000"},' +
        '{"F_ID":"5","F_Name":"博世站","F_ParamValue":"变电站","F_Long":"121.315748000000","F_Lat":"31.202447000000"},' +
        '{"F_ID":"6","F_Name":"农科站","F_ParamValue":"变电站","F_Long":"121.333607000000","F_Lat":"31.233904000000"},' +
        '{"F_ID":"7","F_Name":"舟虹站","F_ParamValue":"开关站","F_Long":"121.320110000000","F_Lat":"31.197732000000"},' +
        '{"F_ID":"8","F_Name":"万通站","F_ParamValue":"开关站","F_Long":"121.319292000000","F_Lat":"31.201161000000"},' +
        '{"F_ID":"9","F_Name":"苏虹站","F_ParamValue":"开关站","F_Long":"121.322167000000","F_Lat":"31.203539000000"},' +
        '{"F_ID":"10","F_Name":"博虹二号","F_ParamValue":"开关站","F_Long":"121.325544000000","F_Lat":"31.207694000000"},' +
        '{"F_ID":"11","F_Name":"博虹三号","F_ParamValue":"开关站","F_Long":"121.326164000000","F_Lat":"31.194188000000"},' +
        '{"F_ID":"12","F_Name":"博虹四号","F_ParamValue":"开关站","F_Long":"121.332740000000","F_Lat":"31.193199000000"},' +
        '{"F_ID":"13","F_Name":"瑞桥二号","F_ParamValue":"开关站","F_Long":"121.320689000000","F_Lat":"31.199840000000"},' +
        '{"F_ID":"14","F_Name":"甬虹三号","F_ParamValue":"开关站","F_Long":"121.322733000000","F_Lat":"31.195883000000"},' +
        '{"F_ID":"15","F_Name":"申虹三号","F_ParamValue":"开关站","F_Long":"121.321179000000","F_Lat":"31.198176000000"},' +
        '{"F_ID":"16","F_Name":"万树一号","F_ParamValue":"开关站","F_Long":"121.319333000000","F_Lat":"31.208612000000"},' +
        '{"F_ID":"17","F_Name":"泰虹一号","F_ParamValue":"开关站","F_Long":"121.322477000000","F_Lat":"31.207686000000"},' +
        '{"F_ID":"18","F_Name":"虹湘站","F_ParamValue":"开关站","F_Long":"121.315349000000","F_Lat":"31.200559000000"},' +
        '{"F_ID":"19","F_Name":"瑞桥三号","F_ParamValue":"开关站","F_Long":"121.322679000000","F_Lat":"31.198976000000"},' +
        '{"F_ID":"20","F_Name":"甬虹四号","F_ParamValue":"开关站","F_Long":"121.323950000000","F_Lat":"31.194222000000"},' +
        '{"F_ID":"21","F_Name":"万树四号","F_ParamValue":"开关站","F_Long":"121.315501000000","F_Lat":"31.205921000000"},' +
        '{"F_ID":"22","F_Name":"泰虹二号","F_ParamValue":"开关站","F_Long":"121.322427000000","F_Lat":"31.208307000000"},' +
        '{"F_ID":"23","F_Name":"01地块-虹桥丽宝广场","F_ParamValue":"地块","F_Long":"121.316921000000","F_Lat":"31.201709000000"}' +
    ']';
    if (result != null && result != "") {
        var DataInfo = eval('(' + result + ')');
        for (var i = 0; i < DataInfo.length; i++) {
            var name = DataInfo[i].F_Name;
            var value = [DataInfo[i].F_Long, DataInfo[i].F_Lat];

            var node = new Object();
            node.name = name;
            switch (DataInfo[i].F_ParamValue) {
                case "变电站":
                    node.value = [DataInfo[i].F_Long, DataInfo[i].F_Lat, 75];
                    PointDataBDZ.push(node);
                    break;
                case "开关站":
                    node.value = [DataInfo[i].F_Long, DataInfo[i].F_Lat, 25];
                    PointDataKGZ.push(node);
                    break;
                case "能源站":
                    node.value = [DataInfo[i].F_Long, DataInfo[i].F_Lat, 100];
                    PointDataNYZ.push(node);
                    break;
                case "地块":
                    node.value = [DataInfo[i].F_Long, DataInfo[i].F_Lat, 50];
                    PointDataDK.push(node);
                    break;

            }

        }
    }

    var inPoint = []
    var outPoint = []
    var result2 = '[{"BeginNode":"青虹站","BeginNodeLong":"121.315542000000","BeginNodeLat":"31.206026000000","EndNode":"杨虹站","EndNodeLong":"121.314212000000","EndNodeLat":"31.203431000000","Type":"开关站"},' +
        '{"BeginNode":"能源站南站","BeginNodeLong":"121.317994000000","BeginNodeLat":"31.194921000000","EndNode":"杨虹站","EndNodeLong":"121.314212000000","EndNodeLat":"31.203431000000","Type":"开关站"},' +
        '{"BeginNode":"能源站北站","BeginNodeLong":"121.312788000000","BeginNodeLat":"31.203037000000","EndNode":"杨虹站","EndNodeLong":"121.314212000000","EndNodeLat":"31.203431000000","Type":"开关站"},' +
        '{"BeginNode":"杨虹站","BeginNodeLong":"121.314212000000","BeginNodeLat":"31.203431000000","EndNode":"能源站南站","EndNodeLong":"121.317994000000","EndNodeLat":"31.194921000000","Type":"能源站"},' +
        '{"BeginNode":"杨虹站","BeginNodeLong":"121.314212000000","BeginNodeLat":"31.203431000000","EndNode":"能源站北站","EndNodeLong":"121.312788000000","EndNodeLat":"31.203037000000","Type":"能源站"},' +
        '{"BeginNode":"青虹站","BeginNodeLong":"121.315542000000","BeginNodeLat":"31.206026000000","EndNode":"博世站","EndNodeLong":"121.315748000000","EndNodeLat":"31.202447000000","Type":"变电站"},' +
        '{"BeginNode":"青虹站","BeginNodeLong":"121.315542000000","BeginNodeLat":"31.206026000000","EndNode":"农科站","EndNodeLong":"121.333607000000","EndNodeLat":"31.233904000000","Type":"变电站"},' +
        '{"BeginNode":"青虹站","BeginNodeLong":"121.315542000000","BeginNodeLat":"31.206026000000","EndNode":"舟虹站","EndNodeLong":"121.320110000000","EndNodeLat":"31.197732000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"万通站","EndNodeLong":"121.319292000000","EndNodeLat":"31.201161000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"苏虹站","EndNodeLong":"121.322167000000","EndNodeLat":"31.203539000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"博虹二号","EndNodeLong":"121.325544000000","EndNodeLat":"31.207694000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"博虹三号","EndNodeLong":"121.326164000000","EndNodeLat":"31.194188000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"博虹四号","EndNodeLong":"121.332740000000","EndNodeLat":"31.193199000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"瑞桥二号","EndNodeLong":"121.320689000000","EndNodeLat":"31.199840000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"甬虹三号","EndNodeLong":"121.322733000000","EndNodeLat":"31.195883000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"申虹三号","EndNodeLong":"121.321179000000","EndNodeLat":"31.198176000000","Type":"开关站"},' +
        '{"BeginNode":"博世站","BeginNodeLong":"121.315748000000","BeginNodeLat":"31.202447000000","EndNode":"万树一号","EndNodeLong":"121.319333000000","EndNodeLat":"31.208612000000","Type":"开关站"},' +
        //'{"BeginNode":"农科站","EndNode":"泰虹一号","Type":"开关站"},'+
        //'{"BeginNode":"万通站","F_Long":"121.319292000000","F_Lat":"31.201161000000","EndNode":"虹湘站","Type":"开关站"},'+
        //'{"BeginNode":"瑞桥二号","EndNode":"瑞桥三号","Type":"开关站"},'+
        //'{"BeginNode":"甬虹三号","EndNode":"甬虹四号","Type":"开关站"},'+
        //'{"BeginNode":"万树一号","EndNode":"万树四号","Type":"开关站"},'+
        //'{"BeginNode":"泰虹一号","EndNode":"泰虹二号","Type":"开关站"},'+
        '{"BeginNode":"万通站","BeginNodeLong":"121.319292000000","BeginNodeLat":"31.201161000000","EndNode":"01地块-虹桥丽宝广场","Type":"地块","EndNodeLong":"121.316921000000","EndNodeLat":"31.201709000000"}' +
        ']';
    if (result2 != null && result2 != "") {
        var DataInfo2 = eval('(' + result2 + ')');
        for (var i = 0; i < DataInfo2.length; i++) {
            var color;
            switch (DataInfo2[i].Type) {
                case "变电站":
                    color = '#e65341';
                    break;
                case "开关站":
                    color = '#00baff';
                    break;
                case "能源站":
                    color = '#6fe683';
                    break;
                case "地块":
                    color = '#ae82fe';
                    break;
            }

            inPoint.push({
                name: DataInfo2[i].BeginNode,
                toname: DataInfo2[i].EndNode,
                coords: [[DataInfo2[i].BeginNodeLong, DataInfo2[i].BeginNodeLat], [DataInfo2[i].EndNodeLong, DataInfo2[i].EndNodeLat]],
                //一个包含两个到多个二维坐标的数组。在 polyline 设置为 true 时支持多于两个的坐标。
                lineStyle: {//单个数据（单条线）的样式设置。
                    normal: {
                        width: 2,
                        color: color,
                        curveness: 0.3,
                    }
                },
                emphasis: {
                    lineStyle: {
                        width: 3
                    },
                    label: {
                        show: true,
                        //position: 'middle',//未起作用
                        //distance:10,
                        formatter: function (params) {
                            return params.data.name + ' -> ' + params.data.toname
                        }
                    }
                }
            })
        }
    }

    var chart = echarts.init(document.getElementById('ChartMap2'));

    //飞机路径
    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var isEffect = true //是否要飞机动效
    var lineWidth = 2  //线条宽度

    var option = {
        title: {
            text: ''
        },
        bmap: {
            center: [121.320822, 31.199426],
            zoom: 16,
            roam: true,
            //地图样式的调整
            mapStyle: {
                styleJson: [
                     //{
                     //    "featureType": "background",//建筑
                     //    "elementType": "all",
                     //    "stylers": {
                     //        "color": "#000"
                     //    }
                     //},
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": {
              "color": "#13516a"
          }
      },
      {
          "featureType": "green",
          "elementType": "all",
          "stylers": {
              "color": "#1f4035",
              "visibility": "off"
          }
      },
      {
          "featureType": "land",//陆地
          "elementType": "all",
          "stylers": {
              "color": "#2b3849"
          }
      },
      {
          "featureType": "manmade",//人造的
          "elementType": "all",
          "stylers": {
              "color": "#2b3849"
          }
      },
      {
          "featureType": "highway",
          "elementType": "all",
          "stylers": {
              "color": "#707b81"
          }
      },
      {
          "featureType": "arterial",//动脉交通
          "elementType": "all",
          "stylers": {
              "color": "#707b81"
          }
      },
      {
          "featureType": "local",//某些建筑边缘线
          "elementType": "all",
          "stylers": {
              "color": "#3b4858"
          }
      },
      {
          "featureType": "poi",//POI是“Point of Interest”的缩写，中文可以翻译为“兴趣点”。
          //在地理信息系统中，一个POI可以是一栋房子、一个商铺、一个邮筒、一个公交站等。
          "elementType": "all",
          "stylers": {
              "visibility": "off"
          }
      }
                ]
            }
        },
        color: ['#6fe683', '#e65341', '#00baff', '#ae82fe'],
        //tooltip: {
        //    trigger: 'item',
        //    formatter: function (v) {
        //        return v[1].replace(':', ' > ');
        //    }
        //},
        legend: {
            orient: 'vertical',
            x: 'left',
            selectedMode: false,
            show: true,
            textStyle: {
                color: "white"
            },
            data: ['能源站', '变电站', '开关站', '地块']
        },
        toolbox: {
            show: false
        },
        //dataRange: {
        //    min: 0,
        //    max: 100,
        //    show: false,
        //    calculable: true,
        //    color: ['#6fe683', '#e65341', '#00baff', '#ae82fe']
        //},
        series: [
            {
                name: '能源站',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: PointDataNYZ
            },
            {
                name: '变电站',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: PointDataBDZ
            },
            {
                name: '开关站',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: PointDataKGZ
            },
            {
                name: '地块',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: PointDataDK
            },
            {
                type: 'lines',
                coordinateSystem: 'bmap',
                zlevel: 10,
                data: inPoint,
                effect: { //线特效的配置
                    show: isEffect,//是否显示特效
                    period: 6,//特效动画的时间，单位为 s。
                    trailLength: 0.2,//特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
                    symbol: planePath,//特效图形的标记
                    symbolSize: 5
                }
            },
        ]
    }
    chart.setOption(option);
}