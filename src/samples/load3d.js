import { buildings } from "@/assets/data.js";
import { v4 as uuidv4 } from "uuid";
import mapboxgl from '@/mapbox/mapbox.js'
import '@/mapbox/mapbox-gl-draw.css'
import '@/mapbox/mapbox-gl.css'

export const loadBuilding3d = (map) => {

    let geojsonId = uuidv4();
    map.addSource(geojsonId, {
        type: "geojson",
        data: buildings,
    });

    map.addLayer(
        {
            'id': uuidv4(),
            'source': geojsonId,  
            'type': 'fill-extrusion',
            'minzoom': 12,
            'paint': {
                'fill-extrusion-color': '#F00', 
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        }
    );

    map.flyTo({
        center: [
            123.46266878283956,
            41.670212167182996
          ],
        zoom: 16,
        bearing: -30,
        pitch: 45, 
        duration: 2000, 
        essential: true 
    });
};

export const loadModel3d = (map) =>{
    const modelOrigin = [123.44987247083219, 41.67011932541112];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
    const THREE = window.THREE;

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
    );
    const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()*4
    };
    const customLayer = {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();

            // create two three.js lights to illuminate the model
            const directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(0, -70, 100).normalize();
            this.scene.add(directionalLight);

            const directionalLight2 = new THREE.DirectionalLight(0xffffff);
            directionalLight2.position.set(0, 70, 100).normalize();
            this.scene.add(directionalLight2);

            // use the three.js GLTF loader to add the 3D model to the three.js scene
            const loader = new THREE.GLTFLoader();
            loader.load(
                //'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
                '34M_17/34M_17.gltf',
                (gltf) => {
                    this.scene.add(gltf.scene);
                }
            );
            this.map = map;
 
            this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true
            });

            this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            const rotationX = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(1, 0, 0),
                modelTransform.rotateX
            );
            const rotationY = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 1, 0),
                modelTransform.rotateY
            );
            const rotationZ = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 0, 1),
                modelTransform.rotateZ
            );

            const m = new THREE.Matrix4().fromArray(matrix);
            const l = new THREE.Matrix4()
                .makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ
                )
                .scale(
                    new THREE.Vector3(
                        modelTransform.scale,
                        -modelTransform.scale,
                        modelTransform.scale
                    )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);

            this.camera.projectionMatrix = m.multiply(l);
            this.renderer.resetState();
            this.renderer.render(this.scene, this.camera);
            this.map.triggerRepaint();
        }
    };

    map.addLayer(customLayer, 'waterway-label');

    map.flyTo({
        center: modelOrigin,
        zoom: 17,
        bearing: -30,
        pitch: 45, 
        duration: 2000, 
        essential: true 
    });
};

export const loadTerrain = (map) =>{
    let geojsonId = uuidv4();
    map.flyTo({
        center: [
            123.65721614343704,
            41.93048863037106
          ],
        zoom: 16,
        bearing: -120,
        pitch: 80, 
        duration: 1000, 
        essential: true 
    });

    setTimeout(() => {
        map.addSource(geojsonId, {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        map.setTerrain({ 'source': geojsonId, 'exaggeration': 1.5 });
    }, 2000);
 
   
};