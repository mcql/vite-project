import {
  Ion,
  Viewer,
  WebMapTileServiceImageryProvider,
  ArcGISTiledElevationTerrainProvider
} from 'cesium'
import { useMount } from 'ahooks'
import './cesium.css'
import { base } from '@/const/base'
import { getGeocoder, searchTdt } from '@/services/td'
import { addMark } from '@/components/cesium/widget/addMark'
import { flyTo } from '@/components/cesium/widget/flyTo'
import SearchAddress from '@/components/cesium/widget/searchAddress'
import { addTiles } from '@/components/cesium/widget/addTiles'
// import { addGeoJson } from '@/components/cesium/widget/addGeoJson'
// import { addModel } from '@/components/cesium/widget/addModel'
import { addLayer } from '@/components/cesium/widget/addLayer'

const earth = () => {
  let viewer: Viewer
  useMount(async () => {
    Ion.defaultAccessToken = base.cesiumTk
    viewer = new Viewer('cesiumViewer', {
      shouldAnimate: true, // 自动播放
      selectionIndicator: true, // 选取指示器
      animation: false, // 动画小器件
      homeButton: false, // Home按钮
      geocoder: false, // geocoder小器件
      shadows: true, // 光照投影
      baseLayerPicker: false, // 图层选择器
      timeline: false, // 时间轴
      fullscreenButton: false, // 全屏按钮
      scene3DOnly: true, // 几何体按3d模式展示
      navigationHelpButton: false, // 帮助按钮
      infoBox: false, // 信息框
      sceneModePicker: false, // 2d 3d选择器
      navigationInstructionsInitiallyVisible: false,
      imageryProvider: new WebMapTileServiceImageryProvider({
        url: base.arcgisMapUrl,
        layer: 'base',
        style: 'default',
        format: 'image/jpeg',
        maximumLevel: 24,
        tileMatrixSetID: 'arcgisBaseMap'
      })
    })
    // 增加图层
    addLayer(viewer)
    // 增加tiles
    addTiles(viewer, base.tilesJson, true)
    // 地形
    viewer.terrainProvider = new ArcGISTiledElevationTerrainProvider({
      url: base.arcgisTerrain
    })
    // 加载geoJSON
    // await addGeoJson(viewer, '/geoJson.json')
    // 增加模型
    // addModel(viewer, '/gltf/RobotExpressive.glb', {
    //   log: 113.23,
    //   lat: 23.16,
    //   height: 500
    // })
  })

  const getAddress = async (address: string) => {
    let { pois } = await searchTdt({
      tk: base.tdtTk,
      postStr: {
        keyWord: address,
        mapBound: '-180,-90,180,90',
        level: 18,
        queryType: 7,
        start: 300,
        count: 100,
        show: 2
      }
    })
    pois?.map((item: any) => {
      addMark(viewer, item)
    })
    let geocoder = await getGeocoder({
      tk: base.tdtTk,
      ds: {
        keyWord: address
      }
    })
    flyTo(viewer, geocoder.location)
  }

  return (
    <div className="cesium">
      <SearchAddress getAddress={getAddress} isShow={true} />
      <div className="cesium-earth" id="cesiumViewer" />
    </div>
  )
}

export default earth
