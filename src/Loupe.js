/**
 * Configured in css
 * @type {Array}
 */
let loupeSize = []
export default class Loupe {
    constructor() {
        this.mousePosition = []
        this.scale = 3
        this.proxy = new Proxy(this, {
            set(target, key, value) {
                if(key==='scale'){
                    if(value>=1){
                        target[key] = value
                    }
                }else{
                    target[key] = value
                }
                if (['scale', 'mousePosition'].indexOf(key) > -1) {
                    target.redrawZoom()
                }
                return true
            },
            get(target, key){
                return target[key]
            }
        })
    }

    /**
     * @override
     */
    setMap(map) {
        this.map = map
        this.createGui()
        map.once('postcompose', (e) => {
            this.setupCanvas(e.context.canvas)
        })
        map.on('postrender', this.postrender)
        const target = map.getTarget()
        const targetEl = typeof target == 'string' ? document.getElementById(target) : target
        targetEl.addEventListener('mousemove', this.mouseEvent)
        targetEl.addEventListener('mouseout', this.mouseEvent)
        map.on(['movestart', 'moveend'], this.mapEvent)
    }
    createGui(){
        this.elem = document.createElement('div')
        this.map.getOverlayContainerStopEvent().appendChild(this.elem)
        this.elem.className = 'ol-unselectable loupe-elem'
        const style=getComputedStyle(document.querySelector('.loupe-elem'))
        loupeSize=['width','height'].map(e=>parseInt(style[e]))
        this.canvas = document.createElement('canvas')
        this.elem.appendChild(this.canvas);
        ['width' ,'height'].forEach((p,i)=>this.canvas[p]=loupeSize[i])
        this.ctx = this.canvas.getContext('2d')
        this.postrender = this.postrender.bind(this)
        this.mouseEvent = this.mouseEvent.bind(this)
        this.mapEvent = this.mapEvent.bind(this)
        this.elem.addEventListener('mousedown', this.mouseEvent)
        this.elem.addEventListener('mouseup', this.mouseEvent)
        this.elem.addEventListener('mousewheel', this.mouseEvent)
    }

    mouseEvent(e) {
        switch (e.type) {
            case 'mousemove':
                this.mousePosition = this.map.getEventPixel(e)
                this.positionToMouse()
                break;
            case 'mouseout':
                this.mousePosition = null
                break;
            case 'mousedown':
                this.moving = true
                break;
            case 'mouseup':
                this.moving = false
                break;
            case 'mousewheel':
                this.proxy.scale -= e.deltaY / 100 * .25
                break;
        }
    }

    positionToMouse() {
        if (this.mousePosition && this.moving) {
            this.drawerCenter = [this.mousePosition[0] - loupeSize[0] / 2, this.mousePosition[1] - loupeSize[1] / 2]
            this.elem.style.left = `${this.drawerCenter[0]}px`
            this.elem.style.top = `${this.drawerCenter[1]}px`
            this.redrawZoom()
        }
    }

    mapEvent(e) {
        const type = e.type
        if(type=='moveend'){
            this.redrawZoom()
        }
    }

    redrawZoom() {
        if (!this.mapCanvas) return
        const drawerPos = ['left','top'].map((v,i)=>parseInt(this.elem.style[v]+loupeSize[i] / 2))
        this.ctx.clearRect(0, 0, loupeSize[0], loupeSize[1])
        const sourcePos = drawerPos.map((p, i) => {
            return p - loupeSize[i] / 2 / this.scale
        })

        this.ctx.fillStyle = 'white'
        this.ctx.beginPath()
        this.ctx.arc(loupeSize[0] / 2, loupeSize[1] / 2, loupeSize[0] / 2, 0, 2 * Math.PI, true)
        this.ctx.fill()

        this.ctx.strokeStyle = 'orange'
        this.ctx.beginPath()
        this.ctx.arc(loupeSize[0] / 2, loupeSize[1] / 2, loupeSize[0] / 2 - .5, 0, 2 * Math.PI, true)
        this.ctx.stroke()

        this.ctx.drawImage(this.mapCanvas, sourcePos[0], sourcePos[1], loupeSize[0] / this.scale, loupeSize[1] / this.scale, 0, 0, loupeSize[0], loupeSize[1])

        this.ctx.beginPath()
        this.ctx.arc(loupeSize[0] / 2, loupeSize[1] / 2, loupeSize[0] / 2, 0, 2 * Math.PI, true)//TODO SIZE has 2 elements. Here is only for circle
        this.ctx.clip()
    }

    postrender(mapEvent) {
        this.redrawZoom()
    }

    setupCanvas(canvas) {
        this.mapCanvas = canvas
    }
}