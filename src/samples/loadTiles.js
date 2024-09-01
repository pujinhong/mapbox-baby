import { v4 as uuidv4 } from "uuid";

export const loadPBF = (map) => {


};

export const loadTDT = (map) => {
    let sourceId = uuidv4();
    let layerId = uuidv4();
    let apikey = '9e03b3e2c30962762eff434223ae7d53';
    const TD_IMG_URL = [
        'https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
        'https://t1.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
        'https://t2.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
        'https://t3.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
        'https://t4.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
        'https://t5.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
        'https://t6.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
        'https://t7.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ apikey,
      ]; 
    map.addSource(sourceId, {   
        type: 'raster',
        tiles: TD_IMG_URL,
        tileSize: 256 
    });

    map.addLayer({
        id: layerId,
        type: 'raster',
        source: sourceId
    }); 

};