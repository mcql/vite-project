import {
  Cartesian3,
  HeightReference,
  HorizontalOrigin,
  VerticalOrigin,
  Viewer
} from 'cesium'
import mark from '@/assets/images/tools/mark.png'

interface markInterface {
  name: string
  lonlat: string
}

export const addMark = (viewer: Viewer, item: markInterface) => {
  viewer.entities.add({
    name: item.name,
    position: Cartesian3.fromDegrees(
      parseFloat(item.lonlat.split(',')[0]),
      parseFloat(item.lonlat.split(',')[1]),
      220
    ),
    billboard: {
      image: mark,
      horizontalOrigin: HorizontalOrigin.CENTER,
      verticalOrigin: VerticalOrigin.BOTTOM,
      scale: 0.05,
      heightReference: HeightReference.CLAMP_TO_GROUND
    }
  })
}
