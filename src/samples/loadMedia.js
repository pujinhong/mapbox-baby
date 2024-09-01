import { v4 as uuidv4 } from "uuid";

export const loadPolygonTexture = (map) => {
  let geojsonId = uuidv4();
    map.addSource(geojsonId, {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [
                          123.43924800763557,
                          41.66393367973188
                        ],
                        [
                          123.43905355871516,
                          41.65503618536013
                        ],
                        [
                          123.44756016452845,
                          41.654564033520984
                        ],
                        [
                          123.4476087598909,
                          41.6639336655264
                        ],
                        [
                          123.43924800763557,
                          41.66393367973188
                        ]
                      ]
                ]
            }
        }
    });
    map.loadImage(
        'texture.jpg',
        (err, image) => {
            if (err) throw err;
            map.addImage('pattern', image);
            map.addLayer({
                'id': 'pattern-layer',
                'type': 'fill',
                'source': geojsonId,
                'paint': {
                    'fill-pattern': 'pattern'
                }
            });
        }
    );
    map.flyTo({
      center: [
        123.44324445687243,
        41.65937506862318
      ],
      zoom: 15,
      bearing: 0,
      pitch: 45, 
      duration: 2000, 
      essential: true 
  });
}
export const loadMp4 = (map) => {
  let sourceId = uuidv4();
  let layerId = uuidv4();
  map.addSource(sourceId, {
      "type": "video",
      "urls": ["Unitylogo.mp4"],
      "coordinates": [ 
        [
          123.42397555491533,
          41.66383631148935
        ],
        [
          123.43860642216976,
          41.66388714919063
        ],
        [
          123.43874252322479,
          41.65519332281821
        ],
        [
          123.42397555491533,
          41.65577803216124
        ],
      ]
  });
  map.addLayer({
      "id": layerId,
      "type": "raster",
      "source": sourceId
  });
   map.flyTo({
    center:  [
      123.4315291654334,
          41.6599725305139
    ],
    zoom: 15,
    bearing: 0,
    pitch: 0, 
    duration: 2000, 
    essential: true 
});
}


export const loadRaster = (map) => {
  let geojsonId = uuidv4();
  map.addSource(geojsonId, {
    'type': 'image',
    'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
    'coordinates': [
      [
        123.47512155175576,
        41.744958090919255
      ],
      [
        123.47512155175576,
        41.68233626437356
      ],
      [
        123.6075336126467,
        41.68233626437356
      ],
      [
        123.6075336126467,
        41.744958090919255
      ]
    ]
  });
  map.addLayer({
      id: uuidv4(),
      'type': 'raster',
      'source': geojsonId,
      'paint': {
          'raster-fade-duration': 0
      }
  });
  map.flyTo({
    center:  [
      123.52643712522047,
          41.710206385487794
    ],
    zoom: 12,
    bearing: 0,
    pitch: 0, 
    duration: 2000, 
    essential: true 
});

 
}