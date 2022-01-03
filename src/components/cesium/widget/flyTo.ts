import { Cartesian3, Math, Viewer } from 'cesium'

interface locationInterface {
  lon: number
  lat: number
  height?: number
}

export const flyTo = (viewer: Viewer, location: locationInterface) => {
  viewer.scene.camera.flyTo({
    destination: Cartesian3.fromDegrees(location.lon, location.lat, 10000),
    orientation: {
      heading: Math.toRadians(0),
      pitch: Math.toRadians(-25.0),
      roll: 0
    }
  })
}
