import * as Three from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRef } from 'react'
import { useFullscreen, useTitle, useMount } from 'ahooks'
import { IconFullscreen } from '@arco-design/web-react/icon'
import earthPic from '@/assets/images/earth.jpg'
import earthBumpPic from '@/assets/images/earth_bump.jpg'
import moonPic from '@/assets/images/moon.jpg'
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
  const camera = new Three.PerspectiveCamera(75, 1, 0.1, 1000)
  // 创建灯光
  const light = new Three.PointLight('#ffffff')
  // 创建材质
  const material = new Three.MeshPhongMaterial()
  const material1 = new Three.MeshPhongMaterial()
  // 加载贴图
  const textureLoader = new Three.TextureLoader()
  // 多边形网格
  const mesh = new Three.Mesh(new Three.SphereGeometry(50, 100, 100), material)
  const mesh1 = new Three.Mesh(new Three.SphereGeometry(10, 60, 60), material1)
  // 渲染
  const renderer = new Three.WebGLRenderer()
  // stats
  const stats = Stats()
  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement)

  useMount(() => {
    if (earthRef.current) {
      mesh1.position.y = 0

      // 缩放及旋转角度范围
      controls.minDistance = 80
      controls.maxDistance = 300
      controls.maxPolarAngle = Math.PI / 2
      // 贴图
      material.map = textureLoader.load(earthPic, () => {
        renderLoad()
      })
      material.bumpMap = textureLoader.load(earthBumpPic, () => {
        renderLoad()
      })
      material1.map = textureLoader.load(moonPic, () => {
        renderLoad()
      })
      material1.bumpMap = textureLoader.load(moonPic, () => {
        renderLoad()
      })
      material.bumpScale = 0.5
      material1.bumpScale = 1
      // 渲染尺寸
      renderer.setSize(
        earthRef.current.offsetWidth,
        earthRef.current.offsetHeight
      )
      // 相机水平垂直比例
      camera.aspect =
        earthRef.current.offsetWidth / earthRef.current.offsetHeight
      // 相机位置
      camera.position.set(100, 100, 50)
      camera.lookAt(scene.position)
      // 更新相机
      camera.updateProjectionMatrix()
      // 灯光位置
      light.position.set(100, 100, 50)
      // stats 位置
      stats.domElement.style.position = 'absolute'
      stats.domElement.style.right = '0px'
      stats.domElement.style.bottom = '0px'
      // dom加载
      statsRef.current?.appendChild(stats.domElement)
      earthRef.current.appendChild(renderer.domElement)
      // 场景添加内容
      // scene.add(axes)
      scene.add(light)
      scene.add(mesh)
      scene.add(mesh1)
      animate()
    }

    return () => {
      // 销毁
      renderer.forceContextLoss()
    }
  })

  const renderLoad = () => {
    // 渲染
    renderer.render(scene, camera)
  }

  const animate = () => {
    // 动画 及 stats监听
    requestAnimationFrame(animate)
    mesh.rotation.y -= 0.002
    mesh1.rotation.y -= 0.02
    mesh1.position.x =
      Math.sin(Date.now() * 0.001) * 70 + Math.cos(Date.now() * -0.002) * -10
    mesh1.position.z =
      Math.cos(Date.now() * 0.001) * 70 + Math.sin(Date.now() * -0.002) * -10
    stats.begin()
    renderLoad()
    stats.end()
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
