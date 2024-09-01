import { antline } from "@/assets/data.js";
import { v4 as uuidv4 } from "uuid";
export const loadAntLine = (map) =>{
    let soureId = uuidv4();
    let layerId1 = uuidv4();
    let layerId2 = uuidv4();
    map.addSource(soureId, {
        type: 'geojson',
        data: antline
    });
 
    map.addLayer({
        type: 'line',
        source: soureId,
        id: layerId1,
        paint: {
            'line-color': 'black',
            'line-width': 6,
            'line-opacity': 0.4
        }
    });
 
    map.addLayer({
        type: 'line',
        source: soureId,
        id: layerId2,
        paint: {
            'line-color': 'yellow',
            'line-width': 6,
            'line-dasharray': [0, 4, 3]
        }
    });

    // 分段
    const dashArraySequence = [
        [0, 4, 3],
        [0.5, 4, 2.5],
        [1, 4, 2],
        [1.5, 4, 1.5],
        [2, 4, 1],
        [2.5, 4, 0.5],
        [3, 4, 0],
        [0, 0.5, 3, 3.5],
        [0, 1, 3, 3],
        [0, 1.5, 3, 2.5],
        [0, 2, 3, 2],
        [0, 2.5, 3, 1.5],
        [0, 3, 3, 1],
        [0, 3.5, 3, 0.5]
    ]; 

    let step = 0;

    function animateDashArray(timestamp) { 
        const newStep = parseInt(
            (timestamp / 50) % dashArraySequence.length
        );

        if (newStep !== step) {
            map.setPaintProperty(
                layerId2,
                'line-dasharray',
                dashArraySequence[step]
            ); 
            step = newStep;
        }
 
        requestAnimationFrame(animateDashArray);
    }
 
    animateDashArray(0);

    map.flyTo({
        center: [
            123.4512595412707,
            41.6685012738908
          ],
        zoom: 14,
        bearing: -30,
        pitch: 20, 
        duration: 1000, 
        essential: true 
    });
}