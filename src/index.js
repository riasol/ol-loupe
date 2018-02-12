import Map from 'ol/map'
import GeoJSONFormat from 'ol/format/geojson'
import VectorSource from 'ol/source/vector'
import VectorLayer from 'ol/layer/vector'
import View from 'ol/view'
import sync from 'ol-hashed';
import Loupe from './Loupe'
//import {defaults as defaultInteractions} from '../src/ol/interaction.js';

import './style.css'
import 'ol/ol.css'

const format=new GeoJSONFormat()
const source=new VectorSource({
    format: format,
    url:'data/countries.geojson'
})
const vectorLayer=new VectorLayer({
    source: source
})
const layers=[vectorLayer]
const map = new Map({
    layers: layers,
    view:new View({
        center:[0,0],
        zoom:2
    }),
    target:'map'
})
map.addControl(new Loupe())
sync(map, { animate: false })