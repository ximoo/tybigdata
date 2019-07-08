var siteGeo = [{
    title: "临时处置场",
    type: "upload",
    icon: "icon-cart",
    active: "active",
    areaCode: "421000",
    center: [112.1678191423, 30.3625445703],
    path: [{
        lng: 112.1671915054,
        lat: 30.3623501665
      },
      {
        lng: 112.167481184,
        lat: 30.3624658831
      },
      {
        lng: 112.1675616503,
        lat: 30.3623455379
      },
      {
        lng: 112.167711854,
        lat: 30.3623270232
      },
      {
        lng: 112.1677708626,
        lat: 30.3622946225
      },
      {
        lng: 112.1682590246,
        lat: 30.3625029124
      },
      {
        lng: 112.1681731939,
        lat: 30.3627574884
      },
      {
        lng: 112.1687793732,
        lat: 30.3630305782
      },
      {
        lng: 112.1685057878,
        lat: 30.3633684679
      },
      {
        lng: 112.1680176258,
        lat: 30.3631277794
      },
      {
        lng: 112.1678620577,
        lat: 30.3633406962
      },
      {
        lng: 112.1671378613,
        lat: 30.363095379
      },
      {
        lng: 112.1672344208,
        lat: 30.3628824617
      },
      {
        lng: 112.1669179201,
        lat: 30.3628084035
      },
      {
        lng: 112.1671646833,
        lat: 30.3624010819
      }
    ],
    door: [{
        lng: 112.1668964624,
        lat: 30.3627065732
      },
      {
        lng: 112.166955471,
        lat: 30.3626510294
      },
      {
        lng: 112.1670198441,
        lat: 30.3626649154
      },
      {
        lng: 112.1669501066,
        lat: 30.3627389738
      }
    ],
    event: [0, 0, 0]
  },
  {
    title: "中山街道拆迁工地",
    type: "site",
    icon: "icon-site-tab",
    areaCode: "421000",
    center: [112.2549748421, 30.3031316101],
    path: [{
        lng: 112.2542560101,
        lat: 30.3009084808
      },
      {
        lng: 112.253998518,
        lat: 30.3007880599
      },
      {
        lng: 112.2507798672,
        lat: 30.3022886795
      },
      {
        lng: 112.2511768341,
        lat: 30.303474338
      },
      {
        lng: 112.2513699532,
        lat: 30.3037336989
      },
      {
        lng: 112.2517454624,
        lat: 30.304437675
      },
      {
        lng: 112.250854969,
        lat: 30.3048545005
      },
      {
        lng: 112.251573801,
        lat: 30.3065588355
      },
      {
        lng: 112.2533869743,
        lat: 30.3057807732
      },
      {
        lng: 112.2536337376,
        lat: 30.3055306805
      },
      {
        lng: 112.2546744347,
        lat: 30.3051972225
      },
      {
        lng: 112.2544705868,
        lat: 30.3049008144
      },
      {
        lng: 112.2562623024,
        lat: 30.3043635725
      },
      {
        lng: 112.2572386265,
        lat: 30.3040023219
      },
      {
        lng: 112.2565627098,
        lat: 30.3026777253
      },
      {
        lng: 112.259362936,
        lat: 30.3016865818
      },
      {
        lng: 112.2587943077,
        lat: 30.3000933208
      },
      {
        lng: 112.2588479519,
        lat: 30.2998895297
      },
      {
        lng: 112.2581720352,
        lat: 30.2996208954
      },
      {
        lng: 112.2549962997,
        lat: 30.300621323
      },
      {
        lng: 112.2544384003,
        lat: 30.3006027966
      },
      {
        lng: 112.254191637,
        lat: 30.3009733228
      }
    ],
    door: [{
        lng: 112.2588908672,
        lat: 30.2999821621
      },
      {
        lng: 112.2587996721,
        lat: 30.2999126878
      },
      {
        lng: 112.2587835789,
        lat: 30.3000006886
      },
      {
        lng: 112.2589552402,
        lat: 30.3000701628
      }
    ],
    event: [0, 0, 0]
  }
];

import store from "../../Configs/store"
let massTruck

export default {
  monitorMap: null,
  initMap(obj, city, e) {
    // console.log(city)
    let that = this
    that.monitorMap = obj.getMap();
    new AMap.DistrictSearch({
      extensions: "all",
      subdistrict: 0
    }).search(city, (status, result) => {
      // self.TextTest = result;
      var outer = [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true)
      ];
      var holes = result.districtList[0].boundaries;
      var pathArray = [outer];
      pathArray.push.apply(pathArray, holes);
      var polygon = new AMap.Polygon({
        pathL: pathArray,
        strokeColor: "#298bff",
        strokeWeight: 5,
        fillColor: "#0a0e1f",
        fillOpacity: 0.65
      });
      polygon.setPath(pathArray);
      that.monitorMap.add(polygon);
    });
  },
  addVecMarker(mapObj, data, e) {
    // if(vechileGroups) 
    e.vecMarkers.clearOverlays();
    e.vecMarkersGps = new Array()
    // console.log(data)
    for (var i in data) {
      let lnglat = data[i].lnglat.split(",")
      let vecMarkers = new AMap.Marker({
        icon: data[i].icon,
        offset: new AMap.Pixel(-12, -15),
        position: lnglat,
        clickable: true
      })
      e.vecMarkersGps.push(vecMarkers);
    }
    e.vecMarkers.addOverlay(new AMap.OverlayGroup(e.vecMarkersGps));
    mapObj.add(e.vecMarkers);
    mapObj.setFitView(e.vecMarkersGps);

  },
  mapAddPointer(mapObj, data, self) {
    let mapGps = []
    for (var i in data) {
      mapGps.push({
        name: data[i].name,
        lnglat: data[i].lnglat.split(","),
        style: data[i].style
      })
    }

    self.massTruck.on("mouseover", function (e) {
      e.tipMapMarker.setPosition(e.data.lnglat);
      e.tipMapMarker.setLabel({
        content: e.data.name
      });
    });
    self.massTruck.setData(mapGps)
    mapObj.setFitView(self.massTruck)
  },
  mapDataChange(mapObj, e, data) {
    e.massTruck.setData(data);
    // this.addSiteMarker(mapObj, e)
    // e.mass3DTruck.setData(truckMarkerGps);
  },
  addSiteMarker(mapObj, e) {
    let that = this
    e.siteMarkers = [];
    let siteMarkerGps = [],
      sitePathGps = [];
    for (var i in siteGeo) {
      e.siteMarkers.push({
        icon: "   /assets/img/behavior/map_icon_2.png",
        position: siteGeo[i].center,
        label: {
          offset: new AMap.Pixel(32, 0),
          content: siteGeo[i].title
        },
        data: {
          path: siteGeo[i].path,
          location: siteGeo[i].center,
          door: siteGeo[i].door,
          pm: siteGeo[i].pm,
          name: siteGeo[i].title,
          truck: siteGeo[i].truck
        }
      });
      switch (siteGeo[i].type) {
        case "upload":
          var siteMarker = new AMap.Marker({
            icon: require("../../../../stastic/img/bigData_jz/icon/icon-upload.png"),
            position: siteGeo[i].center,
            offset: new AMap.Pixel(-16, -16),
            clickable: true
          });
          break;
        case "site":
          var siteMarker = new AMap.Marker({
            icon: require("../../../../stastic/img/bigData_jz/icon/icon-site.png"),
            position: siteGeo[i].center,
            offset: new AMap.Pixel(-16, -16),
            clickable: true
          });
          break;
      }
      var sitePath = [];
      for (var x in siteGeo[i].path) {
        sitePath.push([siteGeo[i].path[x].lng, siteGeo[i].path[x].lat]);
      }

      sitePathGps.push(
        new AMap.Polygon({
          path: sitePath,
          isOutline: true,
          borderWeight: 1,
          strokeColor: "#2cc6b6",
          strokeWeight: 5,
          strokeOpacity: 1,
          strokeStyle: "dashed",
          fillOpacity: 0.2,
          lineJoin: "round",
          lineCap: "round",
          fillColor: "#2cc6b6",
          zIndex: 50
        })
      );

      siteMarker.emit("click", {
        target: siteMarker
      });
      siteMarkerGps.push(siteMarker);
    }

    siteMarkerGps.forEach(function (marker, index) {
      // console.log(index);
      marker.on("click", function () {
        console.log("click!!!!!        " + index);
        e.pantoSite(index);
      });
    });

    var siteGroups = new AMap.OverlayGroup(siteMarkerGps);
    var sitePathGroups = new AMap.OverlayGroup(sitePathGps);
    mapObj.add(siteGroups);
    mapObj.add(sitePathGps);

    setTimeout(function () {
      // mapObj.setFitView(siteMarkerGps);
      // that.pantoBuild(e.siteMarkers[0].data,mapObj,e);
    }, 2000);

    //海量点图标样式
    var style = [{
        url: require("../../../../stastic/img/bigData_jz/icon/icon-drive.png"),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(12, 12)
      },
      {
        url: require("../../../../stastic/img/bigData_jz/icon/icon-stop.png"),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(12, 12)
      },
      {
        url: require("../../../../stastic/img/bigData_jz/icon/icon-alerm.png"),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(12, 12)
      }
    ];

    //加载海量点
    e.mass3DTruck = new AMap.MassMarks([], {
      opacity: 0.8,
      zooms: [3, 20],
      zIndex: 111,
      cursor: "pointer",
      style: style
    });

    e.tip3DMapMarker = new AMap.Marker({
      content: " ",
      zIndex: 1111,
      map: mapObj
    });
    e.mass3DTruck.on("mouseover", function (e) {
      self.tip3DMapMarker.setPosition(e.data.lnglat);
      self.tip3DMapMarker.setLabel({
        content: e.data.name
      });
    });
    e.mass3DTruck.setMap(mapObj);
  },
  pantoBuild(data, mapObj, e) {
    let self = this;
    mapObj.clearMap();
    if (e.object3Dlayer) e.object3Dlayer.clear();
    if (e.object3Dlayer2) e.object3Dlayer2.clear();

    var path = data.path,
      doorpath = data.door;
    var bouns = [],
      doorBouns = [];

    for (var i in path) {
      bouns.push(new AMap.LngLat(path[i].lng, path[i].lat));
    }

    for (var i in doorpath) {
      doorBouns.push(new AMap.LngLat(doorpath[i].lng, doorpath[i].lat));
    }

    var height = 150;
    var color = "#0088ff99"; //rgba

    if (data.pm >= 90) {
      color = "#ff3300aa";
    }

    var prism = new AMap.Object3D.Prism({
      path: bouns,
      height: height,
      color: color
    });
    prism.transparent = true;
    var door = new AMap.Object3D.Prism({
      path: doorBouns,
      height: 100,
      color: "#ffcc0055"
    });
    door.transparent = false;
    e.object3Dlayer.add(prism);
    e.object3Dlayer.add(door);
    mapObj.panTo(data.location);

    var marker = new AMap.Circle({
      center: data.location,
      radius: 50,
      fillColor: "#0088ff55",
      strokeColor: "#0088ffcc",
      strokeWeight: 0,
      fillOpacity: 0.15,
      zIndex: 3
    });
    marker.setMap(mapObj);
    mapObj.setFitView(marker);
  },
  pantoSite(index) {
    let self = this;
    let siteGeo = self.siteGeo;
    for (var i in siteGeo) {
      siteGeo[i]["active"] = "";
    }
    siteGeo[index]["active"] = "active";
    self.siteGeo = siteGeo;
    self.siteEnv = [
      Math.round(Math.random() * 50 + 40),
      Math.round(Math.random() * 50 + 40),
      Math.round(Math.random() * 50 + 40)
    ];
    self.mapObj.panTo(siteGeo[index].center);
    self.mapObj.setZoom(18);
    self.pantoBuild(self.siteMarkers[index].data);
  }
}