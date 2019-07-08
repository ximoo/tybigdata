import store from "../../Configs/store"


var siteGeo = store.state.platformData.fences.site.data

// [{
//     title: "临时处置场",
//     type: "upload",
//     icon: "icon-cart",
//     active: "active",
//     areaCode: "421000",
//     center: [112.1678191423, 30.3625445703],
//     path: [{
//         lng: 112.1671915054,
//         lat: 30.3623501665
//       },
//       {
//         lng: 112.167481184,
//         lat: 30.3624658831
//       },
//       {
//         lng: 112.1675616503,
//         lat: 30.3623455379
//       },
//       {
//         lng: 112.167711854,
//         lat: 30.3623270232
//       },
//       {
//         lng: 112.1677708626,
//         lat: 30.3622946225
//       },
//       {
//         lng: 112.1682590246,
//         lat: 30.3625029124
//       },
//       {
//         lng: 112.1681731939,
//         lat: 30.3627574884
//       },
//       {
//         lng: 112.1687793732,
//         lat: 30.3630305782
//       },
//       {
//         lng: 112.1685057878,
//         lat: 30.3633684679
//       },
//       {
//         lng: 112.1680176258,
//         lat: 30.3631277794
//       },
//       {
//         lng: 112.1678620577,
//         lat: 30.3633406962
//       },
//       {
//         lng: 112.1671378613,
//         lat: 30.363095379
//       },
//       {
//         lng: 112.1672344208,
//         lat: 30.3628824617
//       },
//       {
//         lng: 112.1669179201,
//         lat: 30.3628084035
//       },
//       {
//         lng: 112.1671646833,
//         lat: 30.3624010819
//       }
//     ],
//     door: [{
//         lng: 112.1668964624,
//         lat: 30.3627065732
//       },
//       {
//         lng: 112.166955471,
//         lat: 30.3626510294
//       },
//       {
//         lng: 112.1670198441,
//         lat: 30.3626649154
//       },
//       {
//         lng: 112.1669501066,
//         lat: 30.3627389738
//       }
//     ],
//     event: [0, 0, 0]
//   },
//   {
//     title: "中山街道拆迁工地",
//     type: "site",
//     icon: "icon-site-tab",
//     areaCode: "421000",
//     center: [112.2549748421, 30.3031316101],
//     path: [{
//         lng: 112.2542560101,
//         lat: 30.3009084808
//       },
//       {
//         lng: 112.253998518,
//         lat: 30.3007880599
//       },
//       {
//         lng: 112.2507798672,
//         lat: 30.3022886795
//       },
//       {
//         lng: 112.2511768341,
//         lat: 30.303474338
//       },
//       {
//         lng: 112.2513699532,
//         lat: 30.3037336989
//       },
//       {
//         lng: 112.2517454624,
//         lat: 30.304437675
//       },
//       {
//         lng: 112.250854969,
//         lat: 30.3048545005
//       },
//       {
//         lng: 112.251573801,
//         lat: 30.3065588355
//       },
//       {
//         lng: 112.2533869743,
//         lat: 30.3057807732
//       },
//       {
//         lng: 112.2536337376,
//         lat: 30.3055306805
//       },
//       {
//         lng: 112.2546744347,
//         lat: 30.3051972225
//       },
//       {
//         lng: 112.2544705868,
//         lat: 30.3049008144
//       },
//       {
//         lng: 112.2562623024,
//         lat: 30.3043635725
//       },
//       {
//         lng: 112.2572386265,
//         lat: 30.3040023219
//       },
//       {
//         lng: 112.2565627098,
//         lat: 30.3026777253
//       },
//       {
//         lng: 112.259362936,
//         lat: 30.3016865818
//       },
//       {
//         lng: 112.2587943077,
//         lat: 30.3000933208
//       },
//       {
//         lng: 112.2588479519,
//         lat: 30.2998895297
//       },
//       {
//         lng: 112.2581720352,
//         lat: 30.2996208954
//       },
//       {
//         lng: 112.2549962997,
//         lat: 30.300621323
//       },
//       {
//         lng: 112.2544384003,
//         lat: 30.3006027966
//       },
//       {
//         lng: 112.254191637,
//         lat: 30.3009733228
//       }
//     ],
//     door: [{
//         lng: 112.2588908672,
//         lat: 30.2999821621
//       },
//       {
//         lng: 112.2587996721,
//         lat: 30.2999126878
//       },
//       {
//         lng: 112.2587835789,
//         lat: 30.3000006886
//       },
//       {
//         lng: 112.2589552402,
//         lat: 30.3000701628
//       }
//     ],
//     event: [0, 0, 0]
//   }
// ];


export default {
  initMap(obj, city, e) {
    let self = this
    self.mapObj = obj.getMap();

    self.addSiteMarker(self.mapObj, self)

  },




  addSiteMarker(obj, e) {
    e.siteMarkers = []
    for (var i in siteGeo) {
      console.log(JSON.parse(siteGeo[i].path))
      e.siteMarkers.push({
        icon: require("../../../../stastic/img/bigData_jz/icon/icon-site.png"),
        position: siteGeo[i].center,
        label: {
          offset: new AMap.Pixel(32, 0),
          content: siteGeo[i].title
        },
        data: {
          path: JSON.parse(siteGeo[i].path),
          location: siteGeo[i].center,
          // door: siteGeo[i].door,
          // pm: siteGeo[i].pm,
          name: siteGeo[i].name,
          // truck: siteGeo[i].truck
        }
      })






    }





    e.siteMarkers.forEach(function (marker) {



      let polyPath = []
      for (var i in marker.data.path) {
        polyPath.push([marker.data.path[i].lng, marker.data.path[i].lat])
      }
      console.log(polyPath)

      var object3Dlayer = new AMap.Object3DLayer();
      obj.add(object3Dlayer);

      var bounds = polyPath.map(function (path) {
        return new AMap.LngLat(path[0], path[1]);
      });

      // 创建 Object3D 对象
      var prism = new AMap.Object3D.Prism({
        path: bounds,
        height: 150,
        color: 'rgba(100, 150, 230, 0.75)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
      });

      // 开启透明度支持
      prism.transparent = true;

      // 添加至 3D 图层
      object3Dlayer.add(prism);


      var polygon = new AMap.Polygon({
        map: obj,
        path: polyPath,
        strokeColor: 'rgba(100, 150, 230, 1)' ,
        strokeWeight: 6,
        strokeOpacity: 1,
        strokeStyle: "dashed",
        fillOpacity:0.25,
        fillColor: 'rgba(100, 150, 230, 0.75)' ,
      })


      var mker = new AMap.Marker({
        map: obj,
        icon: marker.icon,
        position: [marker.position[0], marker.position[1]],
        offset: new AMap.Pixel(-12, -30),
        //                    label: marker.label,
        //                    animation:'AMAP_ANIMATION_DROP'
        //                    click:self.showVideo()
      });
      mker.on('click', function () {
        // 
        // obj.add(polygon)
        // console.log(polygon)
        obj.setFitView([polygon])
      });


      var radar = null
      var getOpacity = function (scale) {
        return 1 - Math.pow(scale, 0.3)
      }
      var buildRadar = function () {
        radar = new AMap.Object3D.Mesh();
        radar.transparent = true
        radar.backOrFront = 'front'
        var geometry = radar.geometry;
        var radius = 500; //米
        radius = radius / obj.getResolution(obj.getCenter(), 20);
        var unit = 1;
        var range = 200;
        var count = range / unit;
        for (var i = 0; i < count; i += 1) {
          var angle1 = i * unit * Math.PI / 180;
          var angle2 = (i + 1) * unit * Math.PI / 180;

          var p1x = Math.cos(angle1) * radius;
          var p1y = Math.sin(angle1) * radius;
          var p2x = Math.cos(angle2) * radius;
          var p2y = Math.sin(angle2) * radius;

          geometry.vertices.push(0, 0, 0)
          geometry.vertices.push(p1x, p1y, 0)
          geometry.vertices.push(p2x, p2y, 0)


          var opacityStart = getOpacity(i / count);
          var opacityEnd = getOpacity((i + 1) / count);

          geometry.vertexColors.push(0, 0.5, 0.5, opacityStart)
          geometry.vertexColors.push(0, 0.5, 0.5, opacityStart)
          geometry.vertexColors.push(0, 0.5, 0.5, opacityEnd)
        }
        radar.position([marker.position[0], marker.position[1]])
        object3Dlayer.add(radar)


      };
      function scan() {
        radar.rotateZ(-5)
        AMap.Util.requestAnimFrame(scan);
      }
      buildRadar()
      scan()
      // obj.setFitView([polygon])
      obj.setZoomAndCenter(17, [marker.position[0], marker.position[1]])
    });





  },

}