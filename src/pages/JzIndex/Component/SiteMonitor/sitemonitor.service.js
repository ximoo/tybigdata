import store from "../../Configs/store"


let siteGeo = store.state.platformData.module.sitemonitor.module.fences.site

let object3Dlayer, radar

export default {

  initMap(obj) {
    let self = this
    self.mapObj = obj.getMap();
    // self.addSiteMarker(self.mapObj, self)

  },

  
}