import { Cartesian3, Model, Transforms, Viewer } from 'cesium'

interface modelInterface {
  log: number
  lat: number
  height: number
}

export const addModel = (
  viewer: Viewer,
  url: string,
  item: modelInterface,
  fly?: boolean
) => {
  const modelMatrix = Transforms.eastNorthUpToFixedFrame(
    Cartesian3.fromDegrees(item.log, item.lat, item.height)
  )
  viewer.scene.primitives.add(
    Model.fromGltf({
      url: url,
      modelMatrix: modelMatrix,
      scale: 10
    })
  )
  fly &&
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(item.log, item.lat, 15000.0)
    })
}
