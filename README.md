# ol-loupe

Loupe control for openlayers

## Installation

    npm install ol ol-loupe

## Usage

```js
import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import OSMSource from 'ol/source/osm'
import 'ol/ol.css'

import Loupe from 'ol-loupe'
import 'ol-loupe/style.css' //Or your own

const tileLayer=new TileLayer({
    source: new OSMSource()
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
```

