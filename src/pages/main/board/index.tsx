import './index.css'
import Map from 'react-bmapgl/Map'

const board = () => {
  return (
    <div className="board">
      <Map
        center={{ lng: 116.402544, lat: 39.928216 }}
        enableRotate={true}
        enableScrollWheelZoom={true}
        zoom="5"
        mapStyleV2={{ styleId: 'ce829ae594a409d60d8c62c772f1b460' }}
        maxZoom={7}
        minZoom={4}
        style={{ height: '100%' }}
      />
    </div>
  )
}

export default board
