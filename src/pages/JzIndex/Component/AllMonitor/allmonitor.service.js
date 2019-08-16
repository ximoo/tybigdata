import {
  resolve
} from "url";
import {
  reject
} from "q";

let massTruck




export default {
  monitorMap: null,

 



  addVecMarker(mapObj, data, e) {
    // if(vechileGroups) 
    e.vecMarkers.clearOverlays();
    e.vecMarkersGps = new Array()
    console.log(data)
    for (var i in data) {
      let lnglat = data[i].location.split(",")
      let vecMarkers = new AMap.Marker({
        // icon: data[i].icon,
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
          var _content = "<div class='vec-info-box'>";
          _content += "<div class='vec-number'>" + marker.data.name + "</div>";
          _content +=
            "<div class='vec-address'><i class='el-icon-time'></i> 最后定位时间：" +
            marker.data.address +
            "</div>";
          _content +=
            "<div class='vec-address'><i class='el-icon-map-location'></i> 最后定位位置：" +
            marker.data.address +
            "</div>";
          _content += "</div>";
          console.log(self.siteComponent.infoWindow)
          // 创建 infoWindow 实例
          self.siteComponent.infoWindow = new AMap.InfoWindow({
            // isCustom: true,
            autoMove: true,
            content: "", //传入 dom 对象，或者 html 字符串
            offset: new AMap.Pixel(0, -50),
            zIndex: 500
          });
          self.siteComponent.infoWindow.setContent(_content);
          self.siteComponent.infoWindow.open(self.siteComponent.amapManager.getMap(), [marker.position[0], marker.position[1]]);
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