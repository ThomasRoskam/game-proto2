import * as PIXI from 'pixi.js'
import { Game } from './game'


export class Geld extends PIXI.Sprite {



    constructor(texture: PIXI.Texture, game:Game) {
        super(texture)
        this.x = Math.random() * (900 - 90) + 90
        this.y = Math.random() * (450 + -30) + -30

    }





}