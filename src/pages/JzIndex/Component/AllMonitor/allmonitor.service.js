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

      vecMarkers.on("click", function () {
        mapObj.setZoomAndCenter(16, lnglat);
      });


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
  addSiteMarker(mapObj, data, e) {
    let self = e;
    let obj = mapObj;
    self.siteMarkers = [];
    let siteGeo = data;
    for (var i in siteGeo) {
      if (siteGeo[i].path !== "") {
        console.log(siteGeo[i].type);
        let iconUrl;
        switch (siteGeo[i].type) {
          case "site":
            iconUrl = new AMap.Icon({
              image: require("../../../../stastic/img/bigData_jz/icon/icon-site.png")
            });
            break;
          case "landfill":
            iconUrl = new AMap.Icon({
              image: require("../../../../stastic/img/bigData_jz/icon/icon-upload.png")
            });
            break;
        }

        self.siteMarkers.push({
          icon: iconUrl,
          position: siteGeo[i].center,
          label: {
            offset: new AMap.Pixel(32, 0),
            content: siteGeo[i].title
          },
          data: {
            path: JSON.parse(siteGeo[i].path),
            door: siteGeo[i].door,
            wash: siteGeo[i].wash,
            location: siteGeo[i].center,
            address: siteGeo[i].address,
            // pm: siteGeo[i].pm,
            name: siteGeo[i].name
            // truck: siteGeo[i].truck
          }
        });
      }

      self.siteMarkers.forEach(function (marker) {
        var mker = new AMap.Marker({
          map: obj,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-12, -30)
          //                    label: marker.label,
          //                    animation:'AMAP_ANIMATION_DROP'
          //                    click:self.showVideo()
        });

        mker.on("click", function () {
          console.log(self.siteComponent)
          self.siteComponent.amapManager.getMap().setZoomAndCenter(16, [marker.position[0], marker.position[1]]);
          self.siteComponent.FencesName = {
            name: marker.data.name,
            address: marker.data.address
          };
        });
      });
    }
    obj.setFitView();
  }
}