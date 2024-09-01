import { geojson_point, geojson_line, geojson_polygon } from "@/assets/data.js";
import { v4 as uuidv4 } from "uuid";

export const loadGeojsonLine = (map) => {
  //添加线
  let geojsonId = uuidv4();
  map.addSource(geojsonId, {
    type: "geojson",
    data: geojson_line,
  });
  map.addLayer({
    id: uuidv4(),
    type: "line",
    source: geojsonId,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#888",
      "line-width": 8,
    },
  });
};
export const loadGeojsonPolygon = (map) => {
  // 添加图形
  let geojsonId = uuidv4();
  map.addSource(geojsonId, {
    type: "geojson",
    data: geojson_polygon,
  });
  map.addLayer({
    id: uuidv4(),
    type: "fill",
    source: geojsonId, // reference the data source
    layout: {},
    paint: {
      "fill-color": "#0080ff", // blue color fill
      "fill-opacity": 0.5,
    },
  });
  // Add a black outline around the polygon.
  map.addLayer({
    id: uuidv4(),
    type: "line",
    source: geojsonId,
    layout: {},
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  });
    map.flyTo({
        center: [
            123.4393108765509,
            41.67442650071084
          ],
        zoom: 15,
        bearing: 0,
        pitch: 45, 
        duration: 1000, 
        essential: true 
    });
};
export const loadGeoJsonMarkers = (map) => {
  map.loadImage("/custom_marker.png", (error, image) => {
    if (error) throw error;
    let geojsonId = uuidv4();
    map.addImage("custom-marker", image);
    map.addSource(geojsonId, {
      type: "geojson",
      data: geojson_point,
    });
    map.addLayer({
      id: uuidv4(),
      type: "symbol",
      source: geojsonId,
      layout: {
        "icon-image": "custom-marker",
        "text-field": ["get", "title"],
        "text-offset": [0, 1.25],
        "text-anchor": "top",
      },
    });
  });
};

export const loadGeoJsonMarkers_old = (map) => {
  let geojsonId = uuidv4();
  map.addSource(geojsonId, {
    type: "geojson",
    data: geojson_point,
  });
  map.addLayer({
    id: uuidv4(),
    type: "symbol",
    source: geojsonId,
    layout: {
      "text-field": ["get", "title"],
      "icon-image": ["get", "icon"],
      "icon-allow-overlap": true,
    },
  });

  map.on("click", geojsonId, (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    if (["mercator", "equirectangular"].includes(map.getProjection().name)) {
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseenter", geojsonId, () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", geojsonId, () => {
    map.getCanvas().style.cursor = "";
  });
};
