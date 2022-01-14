import * as Three from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' //gltf模型加载模块
import { useRef } from 'react'
import { useFullscreen, useTitle, useMount } from 'ahooks'
import { IconFullscreen } from '@arco-design/web-react/icon'
import './three.css'

const earth = () => {
  useTitle('Earth', { restoreOnUnmount: true })

  // three 容器
  const earthRef = useRef<HTMLDivElement>(null)
  // stats 容器
  const statsRef = useRef<HTMLDivElement>(null)

  // 创建场景
  const scene = new Three.Scene()
  // 创建辅助线
  // const axes = new Three.AxesHelper(500)
  // 创建摄像机
  const camera = new Three.PerspectiveCamera(60, 1, 1, 100000)
  // 创建灯光
  const light = new Three.PointLight('#ffffff')
  // 渲染
  const renderer = new Three.WebGLRenderer({ alpha: true })
  // stats
  const stats = Stats()
  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  const ambient = new Three.AmbientLight(0x888888)

  const loader = new GLTFLoader()

  useMount(() => {
    if (earthRef.current) {
      renderer.setSize(
        earthRef.current.offsetWidth,
        earthRef.current.offsetHeight
      )
      camera.aspect =
        earthRef.current.offsetWidth / earthRef.current.offsetHeight
      camera.position.set(6000, 9000, 6000)
      camera.lookAt(scene.position)
      loader.load('/gltf/shanghai.gltf', gltf => {
        scene.add(gltf.scene)
      })
      // 灯光位置
      light.position.set(6000, 9000, 6000)
      // stats 位置
      stats.domElement.style.position = 'absolute'
      stats.domElement.style.right = '0px'
      stats.domElement.style.bottom = '0px'
      // dom加载
      statsRef.current?.appendChild(stats.domElement)
      earthRef.current.appendChild(renderer.domElement)
      scene.add(light)
      scene.add(ambient)
      render()
    }

    return () => {
      // 销毁
      renderer.forceContextLoss()
    }
  })

  const render = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  // 测试ahooks
  const [, { enterFullscreen }] = useFullscreen(() => earthRef.current)

  return (
    <div className="earth">
      <div className="earth-content" ref={earthRef} />
      <div className="earth-stats" ref={statsRef} />
      <div className="full-screen">
        <IconFullscreen
          onClick={enterFullscreen}
          style={{ fontSize: 32, color: '#fff' }}
        />
      </div>
    </div>
  )
}

export default earth
