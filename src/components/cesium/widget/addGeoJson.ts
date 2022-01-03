import { Color, GeoJsonDataSource, Viewer } from 'cesium'

interface colorHashInterface {
  [key: string]: any
}

export const addGeoJson = async (
  viewer: Viewer,
  url: string,
  fly?: boolean
) => {
  let dataSource = await GeoJsonDataSource.load(url, {
    clampToGround: true
  })
  await viewer.dataSources.add(dataSource)
  let entities = dataSource.entities.values
  let colorHash: colorHashInterface = {}
  for (let i = 0; i < entities.length; i++) {
    let entity: any = entities[i]
    let name: string = entity.name || ''
    let color: Color | null = colorHash[name]
    if (!color) {
      color = Color.fromRandom({
        alpha: 1.0
      })
      colorHash[name] = color
    }
    entity.polygon.material = color
    entity.polygon.outline = false
    entity.polygon.extrudedHeight = 100.0
  }
  fly && (await viewer.zoomTo(dataSource))
}
