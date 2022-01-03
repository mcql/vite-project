import { Viewer, WebMapTileServiceImageryProvider } from 'cesium'
import { base } from '@/const/base'

export const addLayer = (viewer: Viewer) => {
  viewer.imageryLayers.addImageryProvider(
    new WebMapTileServiceImageryProvider({
      url: base.arcgisMapUrlText,
      layer: 'text',
      style: 'default',
      format: 'image/png',
      tileMatrixSetID: 'arcgisTextMap'
    })
  )
}
