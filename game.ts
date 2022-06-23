import * as PIXI from 'pixi.js'
import heroPlus from "./src/images/plus.png"
import cityImage from "./src/images/city.jpg"
import city2Image from "./src/images/city2.jpg"
import eenEuroImage from "./src/images/1euro.png"
import tweeEuroImage from "./src/images/2euro.png"
import vijfEuroImage from "./src/images/5euro.png"
import { Plus } from './src/plus'
import { Geld } from './src/Geld'


export class Game {
    pixi: PIXI.Application
    loader: PIXI.Loader
    plus: Plus
    bg: PIXI.Sprite
    bg2 :PIXI.Sprite
    geld : Geld
    bank : Geld[] = []

    constructor() {
        this.bank = []
        this.pixi = new PIXI.Application({ width: 1000, height: 546 })
        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()

        this.loader.add('plusTexture', heroPlus)
            .add('cityTexture', cityImage)
            .add('city2Texture', city2Image)
            .add('eenEuroImage', eenEuroImage)
            .add('tweeEuroImage', tweeEuroImage)
            .add('vijfEuroImage', vijfEuroImage)

        this.loader.load(() => this.loadCompleted())



    }



    loadCompleted() {

        this.bg = new PIXI.Sprite(this.loader.resources["cityTexture"].texture!)
        this.pixi.stage.addChild(this.bg)

        this.bg2 = new PIXI.Sprite(this.loader.resources["city2Texture"].texture!)
        this.pixi.stage.addChild(this.bg2)

        this.plus = new Plus(this.loader.resources["plusTexture"].texture!, this)
        this.pixi.stage.addChild(this.plus)

        //1euro
        for (let i = 0; i < 3; i++) {
            this.geld = new Geld(this.loader.resources["eenEuroImage"].texture!, this)
            this.pixi.stage.addChild(this.geld)
            this.bank.push(this.geld)
        }

        for (let i = 0; i < 3; i++) {
            this.geld = new Geld(this.loader.resources["tweeEuroImage"].texture!, this)
            this.pixi.stage.addChild(this.geld)
            this.bank.push(this.geld)
        }

        for (let i = 0; i < 3; i++) {
            this.geld = new Geld(this.loader.resources["vijfEuroImage"].texture!, this)
            this.pixi.stage.addChild(this.geld)
            this.bank.push(this.geld)
        }




        this.pixi.ticker.add((delta: number) => this.update(delta))

    }

    collision(a, b) {
        const bounds1 = a.getBounds()
        const bounds2 = b.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }


    update(delta: number) {
        this.plus.update(delta)
        for(let g = 0; g < this.bank.length; g++){
            if (this.collision(this.plus, this.bank[g])) {
                this.bank[g].destroy()
                this.bank = this.bank.filter(ge => ge != this.bank[g])
            }
        }

    }

}

new Game()