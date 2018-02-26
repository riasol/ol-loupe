import './style.css'

import * as $ from 'jquery'
import Map from 'ol/map'
import TileLayer from 'ol/layer/tile'
import OSM from 'ol/source/osm'
import View from 'ol/view'

$('load', () => {
    mapStart()
    const $cont = $('<div class="launcher">').appendTo('body')
    let showing = false
    for (let i = 0; i < 5; i++) {
        const $item = $('<div class=btnx/>')
            .css({backgroundPosition: `-${i * 56}px 0`})
        $cont.append($item)
        if (i === 0) {
            $item.on('click', () => {
                if (showing) {
                    hideChildren()
                } else {
                    showing = true
                    for (let i = 1; i < 5; i++) {
                        $($cont.children()[i]).show('slow')
                    }
                }

            })
        } else {
            $item.hide()
            $item.on('click', () => {
                hideChildren()
                dialog()
            })
        }
    }
    const hideChildren = () => {
        showing = false
        for (let i = 1; i < 5; i++) {
            $($cont.children()[i]).hide('slow')
        }
    }
})

let dlgCnt = 0
const dialog = () => {
    const $outer = $(`<div class=dialog>Dialog ${dlgCnt}</div>`)
        .css({right: dlgCnt * 50 + 100, bottom: 50 + dlgCnt * 20})
        .appendTo('body')
    dlgCnt++
    const $x = $('<div class=close>x</div>')
        .on('click', () => {
            $outer.remove()
        })
        .appendTo($outer)
}

const mapStart = () => {
    new Map({
        layers:[
            new TileLayer({
                source:new OSM()
            })
        ],
        view:new View({
            center:[0,0],
            zoom:2
        }),
        target:'root'
    })
}