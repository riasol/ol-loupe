import Control from 'ol/control/control'

export default class SubView extends Control {
    constructor(options = {}) {
        super(options)
        this.layers = options.layers
        this.size=[]
    }

    /**
     * @override
     * @param map
     */
    setMap(map) {
        this.map = map
        this.createGui()
        map.once('postcompose',(e)=>{
            e.context.canvas.addEventListener('mousemove',e=>{
                if(e.region){
                    console.log(e.region)
                }
            })
        })
        this.map.getLayers().getArray()
            .filter(l=>this.layers.indexOf(l.get('name'))>-1)
            .forEach(l=>{
                l.on('precompose',this.onLayerPrecompose.bind(this))
                l.on('postcompose',this.onLayerPostcompose.bind(this))
            })
    }

    createGui(){
    }
    onLayerPrecompose(e){
        e.context.save()
        e.context.beginPath()
        const size=this.map.get('size')
        e.context.moveTo(size[0]/2,0)
        e.context.lineTo(size[0],0)
        e.context.lineTo(size[0],size[1])
        e.context.lineTo(size[0]/2,size[1])
        e.context.clip()
        e.context.beginPath()
        e.context.moveTo(size[0]/2,0)
        e.context.lineTo(size[0]/2,size[1])
        e.context.stroke()
    }
    onLayerPostcompose(e){
        e.context.restore()

    }
}