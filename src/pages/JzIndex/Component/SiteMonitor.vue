<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3>场站实时状况</h3>
    <el-amap
      :vid="'amap-vue-air'"
      :center="center"
      :viewMode="'3D'"
      :pitch="pitch"
      :rotation="rotation"
      :features="features"
      :zoom="zoom"
      :zooms="zooms"
      :mapStyle="mapStyle"
      :showLabel="showLabel"
      :resizeEnable="resizeEnable"
      :animateEnable="animateEnable"
      :buildingAnimation="buildingAnimation"
      :expandZoomRange="expandZoomRange"
      :plugin="plugins"
      :amap-manager="amapManager"
      style="height:calc(100% - 36px)"
    ></el-amap>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
import getOption from "./operatedata.service";
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();



var siteGeo = [{
  title: '临时处置场',
  type: 'upload',
  icon: 'icon-cart',
  active: 'active',
  areaCode: '421000',
  center: [112.1678191423, 30.3625445703],
  path: [{lng: 112.1671915054, lat: 30.3623501665},
    {lng: 112.1674811840, lat: 30.3624658831},
    {lng: 112.1675616503, lat: 30.3623455379},
    {lng: 112.1677118540, lat: 30.3623270232},
    {lng: 112.1677708626, lat: 30.3622946225},
    {lng: 112.1682590246, lat: 30.3625029124},
    {lng: 112.1681731939, lat: 30.3627574884},
    {lng: 112.1687793732, lat: 30.3630305782},
    {lng: 112.1685057878, lat: 30.3633684679},
    {lng: 112.1680176258, lat: 30.3631277794},
    {lng: 112.1678620577, lat: 30.3633406962},
    {lng: 112.1671378613, lat: 30.3630953790},
    {lng: 112.1672344208, lat: 30.3628824617},
    {lng: 112.1669179201, lat: 30.3628084035},
    {lng: 112.1671646833, lat: 30.3624010819}],
  door: [{lng: 112.1668964624, lat: 30.3627065732},
    {lng: 112.1669554710, lat: 30.3626510294},
    {lng: 112.1670198441, lat: 30.3626649154},
    {lng: 112.1669501066, lat: 30.3627389738}],
  event: [0, 0, 0]
}, {
  title: '中山街道拆迁工地',
  type: 'site',
  icon: 'icon-site-tab',
  areaCode: '421000',
  center: [112.2549748421, 30.3031316101],
  path: [{lng: 112.2542560101, lat: 30.3009084808},
    {lng: 112.2539985180, lat: 30.3007880599},
    {lng: 112.2507798672, lat: 30.3022886795},
    {lng: 112.2511768341, lat: 30.3034743380},
    {lng: 112.2513699532, lat: 30.3037336989},
    {lng: 112.2517454624, lat: 30.3044376750},
    {lng: 112.2508549690, lat: 30.3048545005},
    {lng: 112.2515738010, lat: 30.3065588355},
    {lng: 112.2533869743, lat: 30.3057807732},
    {lng: 112.2536337376, lat: 30.3055306805},
    {lng: 112.2546744347, lat: 30.3051972225},
    {lng: 112.2544705868, lat: 30.3049008144},
    {lng: 112.2562623024, lat: 30.3043635725},
    {lng: 112.2572386265, lat: 30.3040023219},
    {lng: 112.2565627098, lat: 30.3026777253},
    {lng: 112.2593629360, lat: 30.3016865818},
    {lng: 112.2587943077, lat: 30.3000933208},
    {lng: 112.2588479519, lat: 30.2998895297},
    {lng: 112.2581720352, lat: 30.2996208954},
    {lng: 112.2549962997, lat: 30.3006213230},
    {lng: 112.2544384003, lat: 30.3006027966},
    {lng: 112.2541916370, lat: 30.3009733228}],
  door: [{lng: 112.2588908672, lat: 30.2999821621},
    {lng: 112.2587996721, lat: 30.2999126878},
    {lng: 112.2587835789, lat: 30.3000006886},
    {lng: 112.2589552402, lat: 30.3000701628}],
  event: [0, 0, 0]
}]



export default {
  name: "AirMonitor",
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 8,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      center: [112.24069, 30.33479],
      features: ["bg", "point", "road", "building"],
      pitch: 65,
      rotation: 15,
      buildingAnimation: false, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      mapObj:null,
      plugins: [
        {
          pName: "AMap.DistrictSearch",
          events: {
            init(instance) {
              self.mapObj = amapManager.getMap();

              var buildingLayer = new AMap.Buildings({
                zIndex: 30,
                merge: true,
                sort: true,
                zooms: [16, 20],
                heightFactor: 1
              });

              var toolBar = new AMap.ControlBar({
                showZoomBar: false,
                showControlButton: true,
                position: {
                  right: "15px",
                  bottom: "-75px"
                }
              });

              new AMap.DistrictSearch({
                extensions: "all",
                subdistrict: 0
              }).search("荆州市", (status, result) => {

                var bounds = result.districtList[0].boundaries;
                var mask = [];
                for (var i = 0; i < bounds.length; i += 1) {
                  mask.push([bounds[i]]);
                }

                //添加高度面
                var object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
                self.mapObj.add(object3Dlayer);
                var height = -8000;
                var color = "#298bff"; //rgba
                var outer = [
                  new AMap.LngLat(-360, 90, true),
                  new AMap.LngLat(-360, -90, true),
                  new AMap.LngLat(360, -90, true),
                  new AMap.LngLat(360, 90, true)
                ];
                var pathArray = [outer];
                pathArray.push.apply(pathArray, bounds);
                var wall = new AMap.Object3D.Wall({
                  path: pathArray,
                  height: height,
                  color: color
                });
                wall.backOrFront = "both";
                wall.transparent = true;
                object3Dlayer.add(wall);
                self.mapObj.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 1);
                self.mapObj.DirectionLight = new AMap.Lights.DirectionLight(
                  [1, 0, -0.5],
                  [1, 1, 1],
                  0
                );
                self.markersRegion = new AMap.OverlayGroup();
                self.object3Dlayer = new AMap.Object3DLayer();
                self.mapObj.add(self.object3Dlayer);
                // self.addCircle()
                self.addSiteMarker();
                self.mapObj.addControl(toolBar);

                var outer = [
                  new AMap.LngLat(-360, 90, true),
                  new AMap.LngLat(-360, -90, true),
                  new AMap.LngLat(360, -90, true),
                  new AMap.LngLat(360, 90, true)
                ];
                var pathArray = [outer];
                pathArray.push.apply(pathArray, bounds);
                var polygon = new AMap.Polygon({
                  pathL: pathArray,
                  strokeColor: "#298bff",
                  strokeWeight: 3,
                  fillColor: "#0a0e1f",
                  fillOpacity: 1
                });
                polygon.setPath(pathArray);
                self.mapObj.add(polygon);
              });
            }
          }
        }
      ]
    };
  },
  methods:{
    addSiteMarker() {
      let self = this
      self.siteMarkers = []
      let siteMarkerGps = [], sitePathGps = []
      for (var i in siteGeo) {
        self.siteMarkers.push({
          icon: '/behavior/map_icon_2.png',
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
        })
        switch (siteGeo[i].type) {
          case 'upload':
            var siteMarker = new AMap.Marker({
              icon: require('../../../stastic/img/bigData_jz/icon/icon-upload.png'),
              position: siteGeo[i].center,
              offset: new AMap.Pixel(-16, -16),
              clickable: true
            })
            break
          case 'site':
            var siteMarker = new AMap.Marker({
              icon: require('../../../stastic/img/bigData_jz/icon/icon-site.png'),
              position: siteGeo[i].center,
              offset: new AMap.Pixel(-16, -16),
              clickable: true
            })
            break
        }
        var sitePath = []
        for (var x in siteGeo[i].path) {
          sitePath.push([siteGeo[i].path[x].lng, siteGeo[i].path[x].lat])
        }


        sitePathGps.push(new AMap.Polygon({
          path: sitePath,
          isOutline: true,
          borderWeight: 1,
          strokeColor: '#2cc6b6',
          strokeWeight: 5,
          strokeOpacity: 1,
          strokeStyle: 'dashed',
          fillOpacity: 0.2,
          lineJoin: 'round',
          lineCap: 'round',
          fillColor: '#2cc6b6',
          zIndex: 50
        }))

        // siteMarker.emit('click', {target: siteMarker});
        siteMarkerGps.push(siteMarker)
      }

      siteMarkerGps.forEach(function (marker, index) {
        // console.log(index)
        marker.on('click', function () {
          // console.log('click!!!!!        ' + index)
          self.pantoSite(index)
        })
      })


      var siteGroups = new AMap.OverlayGroup(siteMarkerGps)
      var sitePathGroups = new AMap.OverlayGroup(sitePathGps)
      self.mapObj.add(siteGroups)
      self.mapObj.add(sitePathGps)


      setTimeout(function () {
        self.mapObj.setFitView(siteMarkerGps)
        self.pantoBuild(self.siteMarkers[0].data)
      }, 2000)


      //海量点图标样式
      var style = [{
        url: require('../../../stastic/img/bigData_jz/icon/icon-drive.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(12, 12)
      }, {
        url: require('../../../stastic/img/bigData_jz/icon/icon-stop.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(12, 12)
      }, {
        url: require('../../../stastic/img/bigData_jz/icon/icon-alerm.png'),
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(12, 12)
      }
      ]

      //加载海量点
      self.mass3DTruck = new AMap.MassMarks([], {
        opacity: 0.8,
        zooms: [3, 20],
        zIndex: 111,
        cursor: 'pointer',
        style: style
      })

      self.tip3DMapMarker = new AMap.Marker({content: ' ', zIndex: 1111, map: self.mapObj})
      self.mass3DTruck.on('mouseover', function (e) {
        self.tip3DMapMarker.setPosition(e.data.lnglat)
        self.tip3DMapMarker.setLabel({content: e.data.name})
      })
      self.mass3DTruck.setMap(self.mapObj)
    },
    pantoBuild(data) {
      let self = this
      self.mapObj.clearMap()

      if (self.object3Dlayer) self.object3Dlayer.clear()
      if (self.object3Dlayer2) self.object3Dlayer2.clear()

      var path = data.path, doorpath = data.door
      var bouns = [], doorBouns = []


      for (var i in path) {
        bouns.push(new AMap.LngLat(path[i].lng, path[i].lat))
      }

      for (var i in doorpath) {
        doorBouns.push(new AMap.LngLat(doorpath[i].lng, doorpath[i].lat))
      }

      var height = 150
      var color = '#0088ff99'//rgba

      if (data.pm >= 90) {
        color = '#ff3300aa'
      }

      var prism = new AMap.Object3D.Prism({
        path: bouns,
        height: height,
        color: color
      })
      prism.transparent = true
      var door = new AMap.Object3D.Prism({
        path: doorBouns,
        height: 100,
        color: '#ffcc0055'
      })
      door.transparent = false
      self.object3Dlayer.add(prism)
      self.object3Dlayer.add(door)
      self.mapObj.panTo(data.location)

      var radar = null
      self.object3Dlayer2 = new AMap.Object3DLayer()
      self.mapObj.add(self.object3Dlayer2)
      var getOpacity = function (scale) {
        return 1 - Math.pow(scale, 0.3)
      }

      var buildRadar = function () {
        radar = new AMap.Object3D.Mesh()
        radar.transparent = true
        radar.backOrFront = 'front'
        var geometry = radar.geometry
        var radius = 300//米
        radius = radius / self.mapObj.getResolution(self.mapObj.getCenter(), 20)
        var unit = 1
        var range = 200
        var count = range / unit
        for (var i = 0; i < count; i += 1) {
          var angle1 = i * unit * Math.PI / 180
          var angle2 = (i + 1) * unit * Math.PI / 180

          var p1x = Math.cos(angle1) * radius
          var p1y = Math.sin(angle1) * radius
          var p2x = Math.cos(angle2) * radius
          var p2y = Math.sin(angle2) * radius

          geometry.vertices.push(0, 0, 0)
          geometry.vertices.push(p1x, p1y, 0)
          geometry.vertices.push(p2x, p2y, 0)


          var opacityStart = getOpacity(i / count)
          var opacityEnd = getOpacity((i + 1) / count)

          geometry.vertexColors.push(0, 0.5, 0.5, opacityStart)
          geometry.vertexColors.push(0, 0.5, 0.5, opacityStart)
          geometry.vertexColors.push(0, 0.5, 0.5, opacityEnd)
        }
        radar.position(data.location)
        self.object3Dlayer2.add(radar)


      }
      buildRadar()

      function scan() {
        radar.rotateZ(-5)
        AMap.Util.requestAnimFrame(scan)
      }

      scan()
      var marker = new AMap.Circle({
        center: data.location,
        radius: 50,
        fillColor: '#0088ff55',
        strokeColor: '#0088ffcc',
        strokeWeight: 0,
        fillOpacity: 0.15,
        zIndex: 3
      })
      marker.setMap(self.mapObj)
      self.mapObj.setFitView(marker)
    },
    pantoSite(index) {
      let self = this
      let siteGeo = self.siteGeo
      for (var i in siteGeo) {
        siteGeo[i]['active'] = ''
      }
      siteGeo[index]['active'] = 'active'
      self.siteGeo = siteGeo
      self.siteEnv = [Math.round(Math.random() * 50 + 40), Math.round(Math.random() * 50 + 40), Math.round(Math.random() * 50 + 40)]
      self.mapObj.panTo(siteGeo[index].center)
      self.mapObj.setZoom(18)
      self.pantoBuild(self.siteMarkers[index].data)
    }
  }
};
</script>

