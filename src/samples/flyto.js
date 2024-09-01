import * as turf from "@turf/turf";
import { v4 as uuidv4 } from "uuid";
import mapboxgl from '@/mapbox/mapbox.js'
import '@/mapbox/mapbox-gl-draw.css'
import '@/mapbox/mapbox-gl.css'

export const flyto = (map, lng, lat) => {


    const target = {
        center: [lng, lat],
        zoom: 12.5,
        bearing: 130,
        pitch: 75
    };

    map.flyTo({
        center: [lng, lat],
        zoom: 12.5,
        bearing: 130,
        pitch: 75, 
        duration: 1000, 
        essential: true 
    });
};

export const roam = (map) => {
    let sourceId = uuidv4();
    let layerId = uuidv4();
    map.addSource(sourceId, {
        type: 'geojson',
        data: {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': targetRoute
            }
        }
    });
    map.addLayer({
        type: 'line',
        source: sourceId,
        id: layerId,
        paint: {
            'line-color': 'black',
            'line-width': 5
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        }
    });



    const routeDistance = turf.length(turf.lineString(targetRoute));
    const cameraRouteDistance = turf.length(
        turf.lineString(cameraRoute)
    ); 
    let start;
    function frame(time) {
        if (!start) start = time; 
        const phase = (time - start) / 40000; 
        if (phase > 1) { 
            setTimeout(() => {
                start = 0.0;
            }, 500);
        } 
        const alongRoute = turf.along(
            turf.lineString(targetRoute),
            routeDistance * phase
        ).geometry.coordinates;

        const alongCamera = turf.along(
            turf.lineString(cameraRoute),
            cameraRouteDistance * phase
        ).geometry.coordinates;

        const camera = map.getFreeCameraOptions(); 
        camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
            {
                lng: alongCamera[0],
                lat: alongCamera[1]
            },
            2000
        ); 
        camera.lookAtPoint({
            lng: alongRoute[0],
            lat: alongRoute[1]
        }); 
        map.setFreeCameraOptions(camera); 
        window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);


};
const targetRoute =  [
            [
              123.4391879328179,
              41.668866624357065
            ],
            [
              123.4392823076052,
              41.6717569743042
            ],
            [
              123.4394710571799,
              41.67697337498822
            ],
            [
              123.44834228713916,
              41.67693813045605
            ],
            [
              123.46051663463845,
              41.67700861950112
            ],
            [
              123.46065819681849,
              41.67302586743418
            ],
            [
              123.46466912525705,
              41.671827469023555
            ],
            [
              123.4691519276322,
              41.67217994146034
            ],
            [
              123.46886880327014,
              41.66414309025532
            ],
            [
              123.4618850690465,
              41.663614314870415
            ],
            [
              123.46042225985104,
              41.65832632219315
            ],
            [
              123.46051663463845,
              41.654871265786085
            ],
            [
              123.4507960315969,
              41.65458921218291
            ],
            [
              123.44178323945562,
              41.65525908747452
            ],
            [
              123.43951824457264,
              41.65561165061928
            ],
            [
              123.43899918324507,
              41.66093511951718
            ],
            [
              123.4394710571799,
              41.66632864911094
            ]
          ] 

const cameraRoute =  [
            [
              123.438716058885,
              41.66893712224095
            ],
            [
              123.43852730931025,
              41.672038952717116
            ],
            [
              123.4386216840976,
              41.6746471944775
            ],
            [
              123.43890480845778,
              41.67757252907873
            ],
            [
              123.4610828833587,
              41.67757252907873
            ],
            [
              123.46155475729358,
              41.67344882625255
            ],
            [
              123.46452756307701,
              41.67246191802039
            ],
            [
              123.4698125511398,
              41.67274389334523
            ],
            [
              123.46957661417241,
              41.663543811158036
            ],
            [
              123.46311194127622,
              41.66287402203665
            ],
            [
              123.46131882032614,
              41.65458921218291
            ],
            [
              123.43876324627769,
              41.65462446895043
            ],
            [
              123.43829137234479,
              41.66692790228876
            ]
          ] 