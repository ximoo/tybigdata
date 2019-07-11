import store from "../../Configs/store"




let object3Dlayer, radar

export default {

  initMap(obj, city, e) {
    // console.log(city)
    let self = this
    let monitorMap = obj.getMap();
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
      monitorMap.add(polygon);
      monitorMap.panTo(result.districtList[0].center)
    });
  },

  
}