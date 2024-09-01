<template>
  <div id="mapbox-container">

  </div>
  <div class="baby-toolbar">
    <button @click="loadGeojson">添加GeoJSON数据</button>
    <button @click="loadPolygonTexture(map)">添加纹理图形</button>
    <button @click="loadBuilding3d(map)">建筑拔地而起</button>
    <button @click="loadPBF(map)">加载矢量切片PBF</button>
    <button @click="loadRaster(map)">加载栅格云图</button>
    <button @click="loadTDT(map)">加载天地图</button>
    <button @click="loadModel3d(map)">加载三维模型</button>
    <button @click="loadTerrain(map)">加载三维地形</button>
    <button @click="loadMp4(map)">加载视频图层</button>
    <button @click="loadAntLine(map)">添加蚂蚁线</button>
    <button @click="roam(map)">漫游</button>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const emit = defineEmits(['onload'])

//地图
import mapboxgl from '@/mapbox/mapbox.js'
import '@/mapbox/mapbox-gl-draw.css'
import '@/mapbox/mapbox-gl.css'
let map = null
const initMap = () => {
  map = new mapboxgl.Map({
    container: 'mapbox-container',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [123.46, 41.68], // 地图中心
    pitch: 36, // 倾斜角度
    zoom: 12, // 缩放
    bearing: 0 //地图朝向
  })
  map.on('load', function () {
    console.log('地图加载完成')
    
    emit('onload', map)
  })
  // 导航控制
  map.addControl(new mapboxgl.NavigationControl())
  // 比例尺
  map.addControl(new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }))

  map.once('style.load', function() {
    // 创建天空盒
    map.setFog({
      "range": [0.8, 8],
      "color": "#f8f0e3",
      "horizon-blend": 0.5,
      "high-color": "#add8e6",
      "space-color": "#d8f2ff",
      "star-intensity": 0.15
    });

  })
}

onMounted(() => {
  initMap();
})

import { loadGeojsonLine,loadGeojsonPolygon ,loadGeoJsonMarkers} from '../samples/loadGeoJson.js';
const loadGeojson = () => {
  
  loadGeojsonPolygon(map);
  loadGeojsonLine(map);
  loadGeoJsonMarkers(map);
}
import { loadPolygonTexture ,loadRaster,loadMp4} from '../samples/loadMedia.js'
import { loadBuilding3d ,loadModel3d,loadTerrain} from '../samples/load3d.js'
import { loadPBF,loadTDT} from '../samples/loadTiles.js' 
import { loadAntLine} from '../samples/loadAnimate.js'
import { flyto, roam } from '../samples/flyto.js'

</script>

<style scoped lang="less">
#mapbox-container {
  width: 100%;
  height: 100%;
}

.baby-toolbar {
  position: absolute;
  right: 30px;
  bottom: 30px;
  height: 200px;
  width: 500px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 0 13px #cbc9c9;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  button {
    margin: 4px;
    border: 0;
    border-radius: 4px;
    line-height: 1.2em;
    font-size: 1.2em;
    cursor: pointer;
    caret-color: transparent;
  }
}
</style> ../samples/loadMedia.js