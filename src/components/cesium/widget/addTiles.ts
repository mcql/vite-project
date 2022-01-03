import { Cesium3DTileset, HeadingPitchRange, Viewer } from 'cesium'

export const addTiles = (viewer: Viewer, url: any, isFly?: boolean) => {
  let tiles = new Cesium3DTileset({
    url: url
  })
  tiles.readyPromise.then(tile1 => {
    viewer.scene.primitives.add(tile1)
    isFly &&
      viewer.zoomTo(tiles).then(() => {
        new HeadingPitchRange(0.5, -0.2, tiles.boundingSphere.radius)
      })
  })
  return tiles
}
