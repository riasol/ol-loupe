import Map from 'ol/map'
import GeoJSONFormat from 'ol/format/geojson'
import VectorSource from 'ol/source/vector'
import VectorLayer from 'ol/layer/vector'
import View from 'ol/view'
import Style from 'ol/style/style'
import Stroke from 'ol/style/stroke'
import TileLayer from 'ol/layer/tile'
import OSMSource from 'ol/source/osm'

import sync from 'ol-hashed';
import Loupe from './Loupe'
import SubView from './SubView'

import './style.css'
import 'ol/ol.css'


const format=new GeoJSONFormat()
const source=new VectorSource({
    /*loader:(url, fmt, success, failure)=>{
        success(format.readFeatures(geojson))
    }*/
    format:format,url:'countries.geojson'
})
const vectorLayer=new VectorLayer({
    source: source,
    name:'vector1'
})
const vectorLayer2=new VectorLayer({
    source: source,
    name:'vector2',
    style:[new Style({stroke:new Stroke({color:'red'})})]
})

const tileLayer=new TileLayer({
    source: new OSMSource(),
    name:'osm'
})
const layers=[vectorLayer,tileLayer]
const map = new Map({
    layers: layers,
    view:new View({
        center:[0,0],
        zoom:2
    }),
    target:'map'
})
map.addControl(new SubView({layers:['osm']}))
map.addControl(new Loupe())
sync(map, { animate: false })