import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import OSMSource from 'ol/source/osm'
import Modify from 'ol/interaction/modify'
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import MousePosition from 'ol/control/mouseposition'
import Feature from 'ol/feature'
import WKT from 'ol/format/wkt'
import Select from 'ol/interaction/select'
import Collection from 'ol/collection'

import sync from 'ol-hashed';
import Loupe from './Loupe'

import './style.css'
import 'ol/ol.css'


const tileLayer = new TileLayer({
    source: new OSMSource(),
    name: 'osm'
})
const map = new Map({
    layers: [tileLayer],
    view: new View({
        center: [0, 0],
        zoom: 10
    }),
    target: 'map'
})
const vectorSource = new VectorSource()
const drawing = new VectorLayer({
    source: vectorSource
})
map.addLayer(drawing)
map.once('postcompose', () => {
    const s = 1000, c = map.getView().getCenter()
    const polyText = `POLYGON((${c[0] - s / 2} ${c[1] - s / 2},
${c[0] - s / 2} ${c[1] + s / 2},
    ${c[0] + s / 2} ${c[1] + s / 2},
    ${c[0] + s / 2} ${c[1] - s / 2},
${c[0] - s / 2} ${c[1] - s / 2}))`
    const figure = new WKT().readFeature(polyText)
    vectorSource.addFeature(figure)
// const select = new Select()
// map.addInteraction(select)
    const modify = new Modify({
        source: vectorSource
    })
    let start
    modify.on('modifystart', (e) => {
        start = e.features.getArray()[0].clone()
        console.log('modifystart')
    })
    modify.on('modifyend', (e) => {
        // e.features = start
        //vectorSource.removeFeature(e.features.getArray()[0])
        //vectorSource.removeFeature(figure)
        vectorSource.removeFeature(e.features.getArray()[0])
        //vectorSource.addFeature(figure)
        vectorSource.addFeature(start)
        console.log('modifyend')
        // alert('Prevent change')
    })
    map.addInteraction(modify)
})


// map.addControl(new MousePosition())
sync(map, {animate: false})