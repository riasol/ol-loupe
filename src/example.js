import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import OSMSource from 'ol/source/osm'

import sync from 'ol-hashed';
import Loupe from './Loupe'

import './style.css'
import 'ol/ol.css'



const tileLayer=new TileLayer({
    source: new OSMSource(),
    name:'osm'
})
const map = new Map({
    layers: [tileLayer],
    view:new View({
        center:[0,0],
        zoom:2
    }),
    target:'map'
})
map.addControl(new Loupe())
sync(map, { animate: false })